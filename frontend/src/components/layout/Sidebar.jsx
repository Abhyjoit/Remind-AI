
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  History,
  Settings,
  AudioWaveform,
} from "lucide-react";

const navigationItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Scheduled Tasks",
    path: "/scheduled-tasks",
    icon: CalendarDays,
  },
  {
    name: "Call History",
    path: "/call-history",
    icon: History,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <AudioWaveform size={23} />
        </div>

        <div className="brand-text">
          <h2>RemindAI</h2>
          <span>VOICE REMINDER ASSISTANT</span>
        </div>
      </div>

      <div className="sidebar-section-label">
        MAIN MENU
      </div>

      <nav className="sidebar-navigation">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user-avatar">A</div>

        <div className="sidebar-user-info">
          <strong>Alex Morgan</strong>
          <span>Personal Account</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
