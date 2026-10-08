JSON.stringify({dpr:window.devicePixelRatio,count:document.querySelectorAll('svg').length,heights:[...new Set([...document.querySelectorAll('svg')].map(s=>s.getAttribute('height')))]})
