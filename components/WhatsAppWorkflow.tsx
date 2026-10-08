import { BedDouble, Check, CheckCheck } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { WhatsAppDate, WhatsAppHeader, WhatsAppMessage } from "./WhatsAppUI";

const stages = [
  {
    title: "Checkout starts the handover.",
    detail:
      "A guest checks out in ChatBeds. Room 301 is marked To clean, and the assigned cleaner gets a WhatsApp alert.",
  },
  {
    title: "Your team replies in WhatsApp.",
    detail:
      "The cleaner replies “301 clean”. ChatBeds notifies the supervisor, who inspects and approves the room.",
  },
  {
    title: "Room ready. Front desk updated.",
    detail:
      "ChatBeds changes the room to Ready. Front desk sees the updated availability, ready for the next guest.",
  },
];

const messages = [
  {
    sender: "ChatBeds → Cleaner",
    text: "Room 301 is ready for cleaning.",
    time: "09:52",
  },
  {
    sender: "Cleaner",
    text: "301 clean",
    time: "10:24",
    outgoing: true,
  },
  {
    sender: "ChatBeds → Supervisor",
    text: "Room 301 is ready for inspection.",
    time: "10:24",
  },
  {
    sender: "Supervisor",
    text: "Inspection passed. Room 301 is Ready.",
    time: "10:31",
    outgoing: true,
  },
];

export function WhatsAppWorkflow() {
  return (
    <section id="workflow" className="section workflow-section workflow-static">
      <div className="container">
        <SectionHeading
          className="workflow-intro"
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

        <div className="workflow-static-layout">
          <ol className="workflow-stages" aria-label="From checkout to a ready room">
            {stages.map((stage, index) => (
              <li key={stage.title}>
                <span className="workflow-stage-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <div>
                  <h3>{stage.title}</h3>
                  <p>{stage.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="workflow-handover">
            <div className="workflow-handover-heading">
              <span>One room. One connected handover.</span>
              <span className="workflow-handover-room">Room 301</span>
            </div>
            <div
              className="wa-chat workflow-static-chat"
              role="group"
              aria-label="Example WhatsApp updates between ChatBeds, a cleaner and a supervisor"
            >
              <WhatsAppHeader status="Housekeeping updates · WhatsApp" back={false} />
              <div className="wa-wallpaper workflow-static-messages">
                <WhatsAppDate />
                {messages.map((message) => (
                  <WhatsAppMessage
                    key={message.sender}
                    label={message.sender}
                    outgoing={message.outgoing}
                    time={message.time}
                  >
                    {message.text}
                  </WhatsAppMessage>
                ))}
              </div>
            </div>
            <div className="workflow-ready-result">
              <span className="workflow-result-icon" aria-hidden="true">
                <BedDouble size={24} strokeWidth={1.5} />
              </span>
              <div>
                <strong>Room 301 <span><Check size={13} aria-hidden="true" /> Ready</span></strong>
                <p><CheckCheck size={15} aria-hidden="true" /> Front desk availability updated in ChatBeds.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
