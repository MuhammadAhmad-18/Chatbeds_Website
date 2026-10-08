import { redirect } from "next/navigation";
import { loginUrl } from "@/lib/site-links";

export default function LoginPage() {
  redirect(loginUrl);
}
