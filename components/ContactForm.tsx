"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight, Mail } from "lucide-react";
import { contactEmail } from "@/lib/company";

export function ContactForm() {
  const id = useId();
  const [draftHref, setDraftHref] = useState<string | null>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const nameField = form.elements.namedItem("name") as HTMLInputElement;
    const messageField = form.elements.namedItem("message") as HTMLTextAreaElement;
    nameField.setCustomValidity(name ? "" : "Please enter your name.");
    messageField.setCustomValidity(message ? "" : "Please enter a message.");
    if (!form.reportValidity()) return;

    const subject = "ChatBeds website enquiry";
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setDraftHref(href);
    window.location.href = href;
  }

  function update(event: FormEvent<HTMLFormElement>) {
    const field = event.target;
    if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
      field.setCustomValidity("");
      setDraftHref(null);
    }
  }

  return (
    <form
      className="contact-message-form"
      onSubmit={submit}
      onInput={update}
      aria-labelledby={`${id}-heading`}
      aria-describedby={`${id}-note`}
    >
      <h2 id={`${id}-heading`}>Send us a message</h2>
      <div className="contact-message-fields">
        <div className="contact-message-row">
          <label htmlFor={`${id}-name`}>
            Name
            <input
              id={`${id}-name`}
              name="name"
              autoComplete="name"
              placeholder="John Doe"
              required
              maxLength={120}
            />
          </label>
          <label htmlFor={`${id}-email`}>
            Email
            <input
              id={`${id}-email`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="john@hotel.com"
              required
              maxLength={254}
            />
          </label>
        </div>
        <label htmlFor={`${id}-message`}>
          Message
          <textarea
            id={`${id}-message`}
            name="message"
            placeholder="Tell us about your property or business…"
            rows={6}
            required
            maxLength={4000}
          />
        </label>
      </div>
      <p className="contact-message-note" id={`${id}-note`}>
        Opens a draft in your email app. Review and send it there.
      </p>
      <button type="submit" className="button button-primary contact-message-submit">
        Send Message
        <ArrowRight size={20} aria-hidden="true" />
      </button>
      {draftHref && (
        <div className="contact-message-status" role="status">
          <Mail size={20} aria-hidden="true" />
          <div>
            <strong>Your email draft is ready.</strong>
            <p>
              Nothing has been sent yet. Review and send the message in your
              email app, or email {contactEmail} directly.
            </p>
            <a href={draftHref}>
              Open email draft
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
