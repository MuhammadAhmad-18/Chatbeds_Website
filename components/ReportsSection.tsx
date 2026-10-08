import {
  ArrowDownToLine,
  ArrowUpRight,
  BarChart3,
  Check,
  Eye,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
export function ReportsSection() {
  return (
    <section id="reports" className="section reports-section">
      <div className="container reports-layout">
        <div>
          <SectionHeading
            eyebrow="THE WHOLE PICTURE. WHEN YOU NEED IT."
            title={
              <>
                Know what is happening <br />
                <span className="text-muted-light">across your property.</span>
              </>
            }
          >
            From a busy front desk to an owner’s overview, turn your daily
            activity into a clear view of performance.
          </SectionHeading>
          <div className="report-topics">
            {[
              "Occupancy",
              "ADR & RevPAR",
              "Daily revenue",
              "Arrivals & departures",
              "No-shows",
              "Outstanding balances",
              "Financial reports",
              "PDF export",
            ].map((topic) => (
              <span key={topic}>
                <Check size={13} />
                {topic}
              </span>
            ))}
          </div>
          <div className="owner-note">
            <Eye size={20} />
            <span>
              <strong>Visibility for management and owners.</strong>
              <small>
                Understand each property and keep the wider portfolio in view.
              </small>
            </span>
          </div>
        </div>
        <div className="report-visual">
          <div className="report-header">
            <span>
              <BarChart3 size={18} />
              <strong>Occupancy report</strong>
            </span>
            <span className="report-pdf">
              <ArrowDownToLine size={13} />
              PDF export
            </span>
          </div>
          <div className="report-summary">
            <span>
              <small>Occupancy</small>
              <strong>
                78<em>%</em>
              </strong>
            </span>
            <span>
              <small>ADR</small>
              <strong>$165</strong>
            </span>
            <span>
              <small>RevPAR</small>
              <strong>$129</strong>
            </span>
          </div>
          <div className="report-chart">
            <div className="report-chart-lines">
              <span>100%</span>
              <span>50%</span>
              <span>0%</span>
            </div>
            <div className="report-bars">
              {[42, 59, 51, 68, 63, 80, 78, 71, 86, 79, 91, 84].map(
                (value, i) => (
                  <span style={{ height: `${value}%` }} key={i}>
                    <i />
                  </span>
                ),
              )}
            </div>
          </div>
          <div className="report-chart-labels">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4</span>
          </div>
          <div className="report-footer">
            <span>Illustrative report · Sample figures</span>
            <span>
              One clear view <ArrowUpRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
