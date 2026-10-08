"use client";
import {
  ArrowRight,
  BedDouble,
  Check,
  CheckCheck,
  ClipboardCheck,
  LogOut,
  MessageCircle,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { useScrollWorkflow } from "./useScrollWorkflow";
import {
  WhatsAppComposer,
  WhatsAppDate,
  WhatsAppHeader,
  WhatsAppMessage,
} from "./WhatsAppUI";
const steps = [
  {
    title: "Guest checks out",
    detail: "Front desk completes checkout in ChatBeds.",
    status: "Checked out",
    message: "Guest checked out. Room 301 is marked for cleaning.",
    icon: LogOut,
  },
  {
    title: "Room marked for cleaning",
    detail: "Housekeeping status updates inside the PMS.",
    status: "To clean",
    message: "Room 301 is ready for cleaning. Assigned to your shift.",
    icon: BedDouble,
  },
  {
    title: "The cleaner gets a message",
    detail: "The right person receives a WhatsApp alert.",
    status: "Being cleaned",
    message: "Room 301 is ready for cleaning.",
    icon: MessageCircle,
  },
  {
    title: "A simple reply gets work moving",
    detail: "The cleaner replies “301 clean” from WhatsApp.",
    status: "To inspect",
    message: "301 clean",
    icon: CheckCheck,
  },
  {
    title: "The supervisor is notified",
    detail: "Room 301 is ready for inspection.",
    status: "To inspect",
    message: "Room 301 ready for inspection. Please review.",
    icon: ClipboardCheck,
  },
  {
    title: "Room 301 becomes Ready",
    detail: "The supervisor approves the room.",
    status: "Ready",
    message: "Inspection passed. Room 301 is Ready.",
    icon: Check,
  },
  {
    title: "Front desk sees availability",
    detail: "The PMS is in sync. The room can welcome its next guest.",
    status: "Ready",
    message: "Room 301 is available. Front desk is up to date.",
    icon: Sparkles,
  },
];
export function WhatsAppWorkflow() {
  const { active, scrollMode, trackRef, sceneRef, selectStep } =
    useScrollWorkflow(steps.length);
  const current = steps[active];
  return (
    <section id="workflow" className="section workflow-section">
      <div className="container">
        <div className="workflow-heading-row">
          <SectionHeading
            eyebrow="THIS IS THE CHATBEDS DIFFERENCE"
            title={
              <>
                The PMS does the thinking. <br />
                <span className="text-muted-light">
                  Your team stays in the conversation.
                </span>
              </>
            }
          >
            A checkout becomes a clean room, without a chain of calls, logins or
            follow-ups. ChatBeds connects the work, the people and the PMS.
          </SectionHeading>
        </div>
        <div
          className="workflow-track"
          ref={trackRef}
          data-scroll-mode={scrollMode}
        >
          <div className="workflow-scene" ref={sceneRef} data-step-index={active}>
            <div className="workflow-controls">
              <p>
                <span className="live-dot" aria-hidden="true" />
                {scrollMode
                  ? "Scroll to follow the workflow"
                  : "Select a step to follow the workflow"}
              </p>
              <button
                className="button button-secondary workflow-play"
                onClick={() => selectStep(0)}
              >
                <RotateCcw size={14} aria-hidden="true" />
                Replay workflow
              </button>
            </div>
            <div className="workflow-layout">
              <ol className="workflow-steps">
                {steps.map((step, index) => (
                  <li key={step.title}>
                    <button
                      onClick={() => selectStep(index)}
                      className={`workflow-step${active === index ? " active" : ""}${active >= index ? " completed" : ""}`}
                      aria-pressed={active === index}
                      aria-current={active === index ? "step" : undefined}
                      aria-label={`Step ${index + 1}: ${step.title}${active >= index ? ", completed" : ""}`}
                      data-step-index={index}
                    >
                      <span className="step-number" aria-hidden="true">
                        {active >= index ? <Check size={14} /> : `0${index + 1}`}
                      </span>
                      <span>
                        <strong>{step.title}</strong>
                        <small>{step.detail}</small>
                      </span>
                      <ArrowRight size={16} />
                    </button>
                  </li>
                ))}
              </ol>
              <div className="workflow-mobile-current" aria-hidden="true">
                <span>STEP 0{active + 1} OF 07</span>
                <strong>{current.title}</strong>
                <p>{current.detail}</p>
              </div>
              <div className="workflow-board">
                <span
                  className="sr-only"
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  Room 301: {current.status}. {current.message}
                </span>
                <div className="workflow-board-label">
                  <span className="live-dot" />
                  ONE CONNECTED WORKFLOW<span>Illustrative example</span>
                </div>
                <div className="workflow-room">
                  <div>
                    <span className="workflow-room-icon">
                      <BedDouble size={30} strokeWidth={1.3} />
                    </span>
                    <span>
                      <small>CHATBEDS PMS</small>
                      <h3>Room 301</h3>
                      <p>Deluxe double · Housekeeping</p>
                    </span>
                  </div>
                  <span className={`status ${active >= 5 ? "ready" : "pending"}`}>
                    <span className="live-dot" />
                    {current.status}
                  </span>
                  <div className="status-progress">
                    {["To clean", "Being cleaned", "To inspect", "Ready"].map(
                      (status, index) => (
                        <span
                          key={status}
                          className={
                            index <=
                            (active >= 5
                              ? 3
                              : active >= 3
                                ? 2
                                : active >= 2
                                  ? 1
                                  : 0)
                              ? "is-done"
                              : ""
                          }
                        >
                          {status}
                        </span>
                      ),
                    )}
                  </div>
                </div>
                <div className="workflow-link" aria-hidden="true">
                  <span />
                  <MessageCircle size={19} />
                  <span />
                </div>
                <div
                  className="wa-chat wa-workflow-chat"
                  role="group"
                  aria-label="Illustrative WhatsApp workflow conversation"
                >
                  <WhatsAppHeader
                    status={
                      active === 4
                        ? "Supervisor conversation"
                        : "Housekeeping conversation"
                    }
                  />
                  <div className="wa-wallpaper wa-workflow-messages" key={active}>
                    <WhatsAppDate />
                    <WhatsAppMessage
                      outgoing={active === 3}
                      time="09:52"
                      label={
                        active === 3
                          ? "Cleaner"
                          : active === 4
                            ? "To supervisor"
                            : "ChatBeds"
                      }
                    >
                      {current.message}
                    </WhatsAppMessage>
                  </div>
                  <WhatsAppComposer />
                </div>
                <p className="workflow-outcome">
                  <Check size={15} />
                  {active >= 5
                    ? "Ready in the PMS. Visible to front desk instantly."
                    : "Every update stays connected to the PMS."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
