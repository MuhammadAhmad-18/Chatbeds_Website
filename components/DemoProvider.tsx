"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
  type ReactNode,
  type FormEvent,
} from "react";
import { ArrowUpRight, Check, Download, X } from "lucide-react";
import { contactEmail } from "@/lib/company";
import { demoBookingUrl } from "@/lib/site-links";
import { DemoLink } from "./DemoLink";

const DemoContext = createContext<() => void>(() => {});
export function DemoButton({
  children = "Book a Demo",
  className = "button button-primary",
  arrow = true,
  onClick,
}: {
  children?: ReactNode;
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
}) {
  const open = useContext(DemoContext);
  if (demoBookingUrl) {
    return (
      <DemoLink className={className} onClick={onClick}>
        {children}
        {arrow && <ArrowUpRight size={17} aria-hidden="true" />}
      </DemoLink>
    );
  }
  return (
    <button type="button" className={className} onClick={() => { onClick?.(); open(); }}>
      {children}
      {arrow && <ArrowUpRight size={17} aria-hidden="true" />}
    </button>
  );
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const email = contactEmail;

  function openDemo() {
    previousFocus.current = document.activeElement as HTMLElement;
    setDownloaded(false);
    setOpen(true);
  }
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  function close() {
    setOpen(false);
    previousFocus.current?.focus();
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const request = `ChatBeds demo request\n\nName: ${data.get("name")}\nWork email: ${data.get("email")}\nProperty: ${data.get("property")}\nProperty type: ${data.get("type")}\nWhat would you like to explore? ${data.get("message") || "Complete PMS and WhatsApp operations"}\n`;
    if (email) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent("ChatBeds demo request")}&body=${encodeURIComponent(request)}`;
      return;
    }
    const url = URL.createObjectURL(
      new Blob([request], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "chatbeds-demo-request.txt";
    link.hidden = true;
    (dialog.current ?? document.body).appendChild(link);
    link.click();
    link.remove();
    // Allow the browser to consume the Blob before releasing its URL.
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
    setDownloaded(true);
  }
  return (
    <DemoContext.Provider value={openDemo}>
      {children}
      <dialog
        ref={dialog}
        className="demo-dialog"
        onCancel={close}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        aria-labelledby="demo-title"
      >
        <div className="dialog-inner">
          <button
            className="icon-button dialog-close"
            aria-label="Close demo request"
            onClick={close}
          >
            <X size={22} />
          </button>
          <span className="eyebrow">LET’S TALK ABOUT YOUR PROPERTY</span>
          <h2 id="demo-title">See ChatBeds in action.</h2>
          <p>
            Explore the complete PMS, then see how your team can run operations
            from WhatsApp.
          </p>
          {downloaded ? (
            <div className="download-confirmation" role="status">
              <Check size={28} />
              <h3>Your request file is ready.</h3>
              <p>
                Save the request file, then share it with your ChatBeds contact
                to arrange a demo. No details have been sent.
              </p>
              <button
                className="button button-secondary"
                onClick={() => setDownloaded(false)}
              >
                Prepare another request
              </button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="form-grid">
                <label>
                  Your name
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Alex Morgan"
                  />
                </label>
                <label>
                  Work email
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@yourproperty.com"
                  />
                </label>
              </div>
              <label>
                Property name
                <input
                  name="property"
                  required
                  autoComplete="organization"
                  placeholder="Your hotel or property group"
                />
              </label>
              <label>
                Property type
                <select name="type" defaultValue="Hotel">
                  <option>Hotel</option>
                  <option>Guest house</option>
                  <option>Serviced apartments</option>
                  <option>Vacation rentals</option>
                  <option>Multi-property group</option>
                </select>
              </label>
              <label>
                What would you like to explore?{" "}
                <span className="optional">Optional</span>
                <textarea
                  name="message"
                  rows={2}
                  placeholder="Tell us a little about your operations…"
                />
              </label>
              <p className="form-note">
                {email
                  ? "Your email app will open with your request. Review it before sending."
                  : "Download a demo request to share with your ChatBeds contact. Your information stays on this device; nothing is submitted."}
              </p>
              <button type="submit" className="button button-primary">
                {email ? "Prepare demo email" : "Download demo request"}
                {email ? <ArrowUpRight size={17} /> : <Download size={17} />}
              </button>
            </form>
          )}
        </div>
      </dialog>
    </DemoContext.Provider>
  );
}
