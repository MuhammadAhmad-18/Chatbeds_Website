import {
  Activity,
  ArrowUpRight,
  BedDouble,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  LayoutDashboard,
  MessageSquare,
  Search,
  Settings,
  Users,
  Wrench,
} from "lucide-react";
const modules = [
  [LayoutDashboard, "Overview"],
  [CalendarDays, "Calendar"],
  [BedDouble, "Front desk"],
  [ClipboardList, "Reservations"],
  [Users, "Housekeeping"],
  [Wrench, "Maintenance"],
  [MessageSquare, "Inbox"],
  [CircleDollarSign, "Finance"],
] as const;
export function DashboardFrame() {
  return (
    <div
      className="dashboard-frame"
      role="img"
      aria-label="Illustrative ChatBeds PMS overview: arrivals, departures, occupancy and a live housekeeping update for room 301"
    >
      <div className="browser-bar">
        <span className="browser-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="browser-title">
          <span className="tiny-lock" />
          ChatBeds · Property overview
        </span>
      </div>
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <div className="property-selector">
            <span className="property-monogram">H</span>
            <span>
              Harbor House<small>Property overview</small>
            </span>
            <ChevronDown size={12} />
          </div>
          <div className="dashboard-nav">
            {modules.map(([Icon, label], index) => (
              <div key={label} className={index === 0 ? "active" : ""}>
                <Icon size={14} />
                <span>{label}</span>
                {label === "Inbox" && <b>3</b>}
              </div>
            ))}
          </div>
          <div className="sidebar-bottom">
            <Settings size={13} /> Settings
          </div>
        </aside>
        <div className="dashboard-main">
          <div className="dashboard-top">
            <span>
              <strong>Your property, at a glance.</strong>
              <small>Everything you need for a smooth day.</small>
            </span>
            <div>
              <Search size={14} />
              <Bell size={14} />
              <span className="mini-avatar">AM</span>
            </div>
          </div>
          <div className="overview-title">
            <h3>Overview</h3>
            <span>
              Today <ChevronDown size={11} />
            </span>
          </div>
          <div className="metric-grid">
            {[
              ["Occupancy", "78", "%", "Tonight"],
              ["Arrivals", "12", "", "Expected today"],
              ["Departures", "8", "", "Checking out"],
              ["Rooms to clean", "6", "", "Team notified"],
            ].map(([title, value, unit, detail], i) => (
              <div className="metric" key={title}>
                <span>
                  {title}
                  <span className={`metric-dot metric-dot-${i}`} />
                </span>
                <strong>
                  {value}
                  <em>{unit}</em>
                </strong>
                <small>{detail}</small>
              </div>
            ))}
          </div>
          <div className="dashboard-chart">
            <div className="chart-title">
              <span>
                <strong>Room revenue</strong>
                <small>This week · Sample data</small>
              </span>
              <span className="chart-range">
                7 days <ChevronDown size={10} />
              </span>
            </div>
            <div className="bar-chart">
              <div className="chart-axis">
                <span>4k</span>
                <span>2k</span>
                <span>0</span>
              </div>
              <div className="bars">
                {[45, 60, 49, 74, 66, 88, 78].map((height, i) => (
                  <div className="bar-column" key={i}>
                    <span style={{ height: `${height}%` }} />
                    <small>{["M", "T", "W", "T", "F", "S", "S"][i]}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="dashboard-bottom">
            <div className="room-card">
              <div>
                <span className="room-icon">
                  <BedDouble size={17} />
                </span>
                <span>
                  <strong>Room 301</strong>
                  <small>Deluxe double</small>
                </span>
                <span className="status ready">
                  <Check size={10} /> Ready
                </span>
              </div>
              <p>
                <span className="live-dot" />
                Updated from staff chat <span>Just now</span>
              </p>
            </div>
            <div className="activity-card">
              <Activity size={15} />
              <span>
                <strong>Everyone in sync.</strong>
                <small>Housekeeping → Front desk</small>
              </span>
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
