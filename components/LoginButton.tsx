import { loginUrl } from "@/lib/site-links";

export function LoginButton({ onOpen }: { onOpen?: () => void }) {
  return (
    <a href={loginUrl} className="button nav-login" onClick={onOpen}>
      Login
    </a>
  );
}
