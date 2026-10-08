"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Download } from "lucide-react";
import { contactEmail } from "@/lib/company";

export function EnquiryForm({ kind = "demo" }: { kind?: "demo" | "contact" }) {
  const id = useId();
  const [draft, setDraft] = useState<{ href: string; text: string } | null>(
    null,
  );
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject =
      kind === "demo"
        ? "ChatBeds demo request"
        : `ChatBeds enquiry: ${data.get("topic")}`;
    const text = `${subject}\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\nProperty: ${data.get("property") || "Not provided"}\nProperty type: ${data.get("type") || "Not provided"}\nRooms / units: ${data.get("rooms") || "Not provided"}\n\n${data.get("message") || "I would like to explore the complete PMS and WhatsApp operations."}\n`;
    const href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    setDraft({ href, text });
    window.location.href = href;
  }
  function download() {
    if (!draft) return;
    const url = URL.createObjectURL(
      new Blob([draft.text], { type: "text/plain;charset=utf-8" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "chatbeds-enquiry.txt";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }
  return (
    <form
      className="page-enquiry-form"
      onSubmit={submit}
      aria-labelledby={`${id}-heading`}
    >
      <h2 id={`${id}-heading`}>
        {kind === "demo"
          ? "Tell us about your property."
          : "Start a conversation."}
      </h2>
      <p>
        Share a little context so we can focus on what matters to your team.
      </p>
      <div className="page-form-grid">
        <label htmlFor={`${id}-name`}>
          Your name
          <input
            id={`${id}-name`}
            name="name"
            required
            autoComplete="name"
            placeholder="Your full name"
            maxLength={120}
          />
        </label>
        <label htmlFor={`${id}-email`}>
          Work email
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@yourproperty.com"
            maxLength={254}
          />
        </label>
      </div>
      {kind === "contact" && (
        <label htmlFor={`${id}-topic`}>
          What can we help with?
          <select
            id={`${id}-topic`}
            name="topic"
            defaultValue="Product and pricing"
          >
            <option>Product and pricing</option>
            <option>Account access</option>
            <option>Property operations</option>
            <option>General enquiry</option>
          </select>
        </label>
      )}
      <label htmlFor={`${id}-property`}>
        Property name {kind === "contact" && <span>Optional</span>}
        <input
          id={`${id}-property`}
          name="property"
          required={kind === "demo"}
          autoComplete="organization"
          placeholder="Your hotel or property group"
          maxLength={180}
        />
      </label>
      {kind === "demo" && (
        <div className="page-form-grid">
          <label htmlFor={`${id}-type`}>
            Property type
            <select id={`${id}-type`} name="type" defaultValue="Hotel">
              <option>Hotel</option>
              <option>Guest house</option>
              <option>Serviced apartments</option>
              <option>Vacation rentals</option>
              <option>Multi-property group</option>
            </select>
          </label>
          <label htmlFor={`${id}-rooms`}>
            Rooms / units <span>Optional</span>
            <input
              id={`${id}-rooms`}
              name="rooms"
              type="number"
              min="1"
              max="1000000"
              inputMode="numeric"
              placeholder="e.g. 40"
            />
          </label>
        </div>
      )}
      <label htmlFor={`${id}-message`}>
        {kind === "demo" ? "What would you like to explore?" : "Your message"}{" "}
        {kind === "demo" && <span>Optional</span>}
        <textarea
          id={`${id}-message`}
          name="message"
          rows={4}
          required={kind === "contact"}
          maxLength={4000}
          placeholder={
            kind === "demo"
              ? "Tell us about your teams, properties and everyday handovers…"
              : "How can the ChatBeds team help?"
          }
        />
      </label>
      <p className="page-form-note" id={`${id}-note`}>
        This prepares an email to {contactEmail} in your email app. Review and
        send it there. This form does not send your details automatically.
      </p>
      <button
        type="submit"
        className="button button-primary"
        aria-describedby={`${id}-note`}
      >
        Prepare {kind === "demo" ? "demo request" : "enquiry email"}
        <ArrowUpRight size={17} aria-hidden="true" />
      </button>
      {draft && (
        <div className="page-draft-ready" role="status">
          <Check size={19} aria-hidden="true" />
          <div>
            <strong>Your email draft is ready.</strong>
            <p>
              Nothing has been sent. If your email app did not open, open the
              draft below or download it to share with the team.
            </p>
            <a href={draft.href}>
              Open email draft
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <button type="button" onClick={download}>
              <Download size={14} aria-hidden="true" />
              Download request
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
