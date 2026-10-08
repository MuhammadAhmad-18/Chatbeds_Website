param(
    [Parameter(Mandatory = $true)]
    [ValidateSet('start', 'status', 'stop')]
    [string]$Action
)

$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$runtimeDirectory = Join-Path $projectRoot '.dev-server'
$stateFile = Join-Path $runtimeDirectory 'process.json'
$outputLog = Join-Path $runtimeDirectory 'output.log'
$errorLog = Join-Path $runtimeDirectory 'error.log'
$nextCli = Join-Path $projectRoot 'node_modules\next\dist\bin\next'
$serverUrl = 'http://localhost:3000'

function Get-ManagedServer {
    if (-not (Test-Path -LiteralPath $stateFile)) { return $null }
    $saved = Get-Content -LiteralPath $stateFile -Raw | ConvertFrom-Json
    $candidate = Get-Process -Id $saved.processId -ErrorAction SilentlyContinue
    if ($null -eq $candidate) { return $null }
    # A reused PID must never allow us to stop an unrelated process.
    if ($candidate.StartTime.ToUniversalTime().Ticks.ToString() -ne $saved.startTicks) { return $null }
    $details = Get-CimInstance Win32_Process -Filter "ProcessId=$($candidate.Id)"
    if ($null -eq $details.CommandLine -or -not $details.CommandLine.Contains($nextCli)) { return $null }
    return $candidate
}

try {
    $managedServer = Get-ManagedServer
    if ($Action -eq 'stop') {
        if ($null -eq $managedServer) {
            Write-Output 'No background ChatBeds server is running.'
            exit 0
        }
        # Next.js spawns a server child; stop only this verified process tree.
        & taskkill.exe /PID $managedServer.Id /T /F | Out-Null
        if ($LASTEXITCODE -ne 0) { throw 'Could not stop the background server.' }
        Remove-Item -LiteralPath $stateFile -Force
        Write-Output 'ChatBeds background server stopped.'
        exit 0
    }

    if ($Action -eq 'status') {
        if ($null -eq $managedServer) {
            Write-Output 'No background ChatBeds server is running. Start it with npm run dev:bg.'
        } else {
            Write-Output "ChatBeds background server is running (PID $($managedServer.Id)): $serverUrl"
            Write-Output "Logs: $runtimeDirectory"
        }
        exit 0
    }

    if ($null -ne $managedServer) {
        Write-Output "ChatBeds is already running in the background: $serverUrl"
        exit 0
    }
    if (-not (Test-Path -LiteralPath $nextCli)) { throw 'Dependencies are missing. Run npm install first.' }
    $listener = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
    if ($null -ne $listener) {
        throw 'Port 3000 is already in use. Stop the existing server (Ctrl+C in its terminal), then run npm run dev:bg.'
    }

    New-Item -ItemType Directory -Path $runtimeDirectory -Force | Out-Null
    $nodeExecutable = (Get-Command node.exe -ErrorAction Stop).Source
    $serverArguments = '"' + $nextCli + '" dev --hostname 127.0.0.1 --port 3000'
    $startedServer = Start-Process -FilePath $nodeExecutable -ArgumentList $serverArguments `
        -WorkingDirectory $projectRoot -WindowStyle Hidden -PassThru `
        -RedirectStandardOutput $outputLog -RedirectStandardError $errorLog
    @{
        processId = $startedServer.Id
        startTicks = $startedServer.StartTime.ToUniversalTime().Ticks.ToString()
    } | ConvertTo-Json | Set-Content -LiteralPath $stateFile -Encoding UTF8

    $deadline = (Get-Date).AddSeconds(60)
    while ((Get-Date) -lt $deadline) {
        if ($null -eq (Get-ManagedServer)) {
            if (Test-Path -LiteralPath $errorLog) { Get-Content -LiteralPath $errorLog -Tail 12 }
            throw "The server exited. Check $errorLog"
        }
        try {
            $response = Invoke-WebRequest -Uri 'http://127.0.0.1:3000' -UseBasicParsing -TimeoutSec 3
            if ($response.StatusCode -eq 200) {
                Write-Output "ChatBeds is ready: $serverUrl"
                Write-Output 'You can close this terminal. Use npm run dev:stop to stop the server.'
                exit 0
            }
        } catch {
            # Initial compilation can take a few seconds.
        }
        Start-Sleep -Milliseconds 500
    }
    throw "The process started but the homepage is not ready yet. Check $outputLog and $errorLog. Use npm run dev:stop to stop it."
} catch {
    Write-Error $_ -ErrorAction Continue
    exit 1
}
