
import {
  Search,
  Bell,
  Plus,
  Phone,
  CalendarDays,
  CircleCheck,
  Layers,
  Gauge,
  CalendarCheck,
  BellRing,
  ArrowRight,
  ChevronDown,
  PhoneCall,
  Clock,
  Check,
  Settings,
  ShieldCheck,
  Bot,
  Server,
  Activity,
  CircleAlert,
  User,
} from "lucide-react";

const statistics = [
  {
    title: "Total Calls",
    value: "1,250",
    change: "+12%",
    trend: "up",
    icon: Phone,
    featured: true,
  },
  {
    title: "Tasks Scheduled",
    value: "310",
    change: "+8%",
    trend: "up",
    icon: CalendarDays,
  },
  {
    title: "Tasks Completed",
    value: "880",
    change: "+15%",
    trend: "up",
    icon: CircleCheck,
  },
  {
    title: "Pending Tasks",
    value: "60",
    change: "-10%",
    trend: "down",
    icon: Layers,
  },
  {
    title: "Completion Rate",
    value: "85%",
    icon: Gauge,
    progress: 85,
  },
];

const recentCalls = [
  {
    name: "John Smith",
    task: "Meeting Reminder",
    time: "Today, 10:30 AM",
    status: "Completed",
    statusClass: "completed",
  },
  {
    name: "Sarah Johnson",
    task: "Payment Follow-up",
    time: "Today, 09:15 AM",
    status: "No Answer",
    statusClass: "no-answer",
  },
  {
    name: "Michael Brown",
    task: "Appointment Reminder",
    time: "Yesterday, 04:20 PM",
    status: "Completed",
    statusClass: "completed",
  },
  {
    name: "Emily Davis",
    task: "Project Follow-up",
    time: "Yesterday, 02:00 PM",
    status: "Busy",
    statusClass: "busy",
  },
];

const completionTrend = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 65 },
  { day: "Wed", value: 52 },
  { day: "Thu", value: 80 },
  { day: "Fri", value: 68 },
  { day: "Sat", value: 92 },
  { day: "Sun", value: 75 },
];

const activities = [
  {
    title: "Task completed",
    description: "Meeting reminder for John Smith was completed.",
    time: "10 minutes ago",
    icon: Check,
    type: "success",
  },
  {
    title: "New reminder created",
    description: "Payment follow-up scheduled for Sarah Johnson.",
    time: "35 minutes ago",
    icon: CalendarCheck,
    type: "primary",
  },
  {
    title: "Call attempt recorded",
    description: "No answer received from Sarah Johnson.",
    time: "1 hour ago",
    icon: PhoneCall,
    type: "warning",
  },
  {
    title: "Settings updated",
    description: "Quiet hours preferences were changed.",
    time: "Yesterday",
    icon: Settings,
    type: "info",
  },
];

function Dashboard() {
  return (
    <div className="page-content dashboard-page">
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div className="dashboard-welcome">
          <h1>Good morning,</h1>
          <h2>Alex 👋</h2>
          <p>Here's your complete reminder overview.</p>
        </div>

        <div className="dashboard-header-actions">
          <div className="dashboard-search">
            <Search size={19} />
            <input
              type="search"
              placeholder="Search tasks, calls, reminders..."
            />
            <span>⌘K</span>
          </div>

          <button className="notification-button" aria-label="Notifications">
            <Bell size={21} />
            <span className="notification-dot"></span>
          </button>

          <button className="create-reminder-button">
            <Plus size={20} />
            Create Reminder
          </button>
        </div>
      </header>

      {/* Statistics Cards */}
      <section className="statistics-grid">
        {statistics.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className={`stat-card ${item.featured ? "stat-card-featured" : ""}`}
            >
              <div className="stat-icon">
                <Icon size={27} />
              </div>

              <div className="stat-information">
                <p>{item.title}</p>

                <div className="stat-value-row">
                  <strong>{item.value}</strong>

                  {item.change && (
                    <span className={`stat-change ${item.trend}`}>
                      {item.trend === "up" ? "↑" : "↓"} {item.change}
                    </span>
                  )}

                  {item.progress !== undefined && (
                    <div className="stat-progress">
                      <div style={{ width: `${item.progress}%` }}></div>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Calls, Tasks and Schedule */}
      <section className="dashboard-overview-grid">
        {/* Calls Overview */}
        <article className="dashboard-panel">
          <div className="panel-heading">
            <div className="panel-title">
              <span className="panel-icon">
                <Phone size={21} />
              </span>
              <h3>Calls Overview</h3>
            </div>

            <button className="period-button">
              Last 7 Days <ChevronDown size={14} />
            </button>
          </div>

          <div className="overview-content">
            <div className="donut-chart calls-donut">
              <div className="donut-center">
                <strong>1,232</strong>
                <span>Total Calls</span>
              </div>
            </div>

            <div className="chart-legend">
              <div><i className="legend-green"></i><span>Connected</span><strong>56%</strong></div>
              <div><i className="legend-red"></i><span>No Answer</span><strong>26%</strong></div>
              <div><i className="legend-yellow"></i><span>Busy</span><strong>12%</strong></div>
              <div><i className="legend-purple"></i><span>Voicemail</span><strong>6%</strong></div>
            </div>
          </div>
        </article>

        {/* Tasks Overview */}
        <article className="dashboard-panel">
          <div className="panel-heading">
            <div className="panel-title">
              <span className="panel-icon">
                <CalendarCheck size={21} />
              </span>
              <h3>Tasks Overview</h3>
            </div>

            <button className="period-button">
              Today <ChevronDown size={14} />
            </button>
          </div>

          <div className="overview-content">
            <div className="donut-chart tasks-donut">
              <div className="donut-center">
                <strong>25/30</strong>
                <span>Completed</span>
              </div>
            </div>

            <div className="chart-legend tasks-legend">
              <div><i className="legend-green"></i><span>Completed</span><strong>25</strong></div>
              <div><i className="legend-yellow"></i><span>Pending</span><strong>3</strong></div>
              <div><i className="legend-purple"></i><span>Scheduled</span><strong>2</strong></div>
            </div>
          </div>
        </article>

        {/* Upcoming Schedule */}
        <article className="dashboard-panel">
          <div className="panel-heading">
            <div className="panel-title">
              <span className="panel-icon">
                <CalendarDays size={21} />
              </span>
              <h3>Upcoming Schedule</h3>
            </div>

            <a href="/scheduled-tasks" className="panel-link">
              View All <ArrowRight size={15} />
            </a>
          </div>

          <div className="schedule-list">
            <div className="schedule-item">
              <span className="schedule-dot"></span>
              <strong>10:00 AM</strong>
              <span>Client Follow-up</span>
              <span className="schedule-tag call-tag">Call</span>
            </div>

            <div className="schedule-item">
              <span className="schedule-dot"></span>
              <strong>2:00 PM</strong>
              <span>Project Update Call</span>
              <span className="schedule-tag call-tag">Call</span>
            </div>

            <div className="schedule-item">
              <span className="schedule-dot"></span>
              <strong>4:30 PM</strong>
              <span>Doctor Appointment Reminder</span>
              <span className="schedule-tag reminder-tag">
                <BellRing size={12} /> Reminder
              </span>
            </div>
          </div>
        </article>
      </section>

      {/* Recent Calls and Task Completion Trend */}
      <section className="dashboard-lower-grid">
        {/* Recent Calls */}
        <article className="dashboard-panel recent-calls-panel">
          <div className="panel-heading">
            <div className="panel-title">
              <span className="panel-icon">
                <PhoneCall size={21} />
              </span>
              <h3>Recent Calls</h3>
            </div>

            <a href="/call-history" className="panel-link">
              View All <ArrowRight size={15} />
            </a>
          </div>

          <div className="recent-calls-list">
            {recentCalls.map((call) => (
              <div className="recent-call-item" key={`${call.name}-${call.time}`}>
                <div className="call-avatar">
                  <User size={18} />
                </div>

                <div className="recent-call-information">
                  <strong>{call.name}</strong>
                  <span>{call.task}</span>
                  <small><Clock size={12} /> {call.time}</small>
                </div>

                <span className={`call-status ${call.statusClass}`}>
                  {call.status}
                </span>
              </div>
            ))}
          </div>
        </article>

        {/* Task Completion Trend */}
        <article className="dashboard-panel trend-panel">
          <div className="panel-heading">
            <div className="panel-title">
              <span className="panel-icon">
                <Activity size={21} />
              </span>
              <h3>Task Completion Trend</h3>
            </div>

            <button className="period-button">
              This Week <ChevronDown size={14} />
            </button>
          </div>

          <div className="trend-summary">
            <strong>477</strong>
            <span>Tasks completed this week</span>
          </div>

          <div className="trend-chart">
            {completionTrend.map((item) => (
              <div className="trend-bar-column" key={item.day}>
                <div className="trend-bar-track">
                  <div
                    className="trend-bar"
                    style={{ height: `${item.value}%` }}
                  ></div>
                </div>
                <span>{item.day}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* Quick Settings and System Status */}
      <section className="dashboard-lower-grid">
        {/* Quick Settings */}
        <article className="dashboard-panel">
          <div className="panel-heading">
            <div className="panel-title">
              <span className="panel-icon">
                <Settings size={21} />
              </span>
              <h3>Quick Settings</h3>
            </div>

            <a href="/settings" className="panel-link">
              All Settings <ArrowRight size={15} />
            </a>
          </div>

          <div className="quick-settings-list">
            <div className="quick-setting-item">
              <span className="quick-setting-icon"><Clock size={18} /></span>
              <div>
                <strong>Quiet Hours</strong>
                <small>10:00 PM – 8:00 AM</small>
              </div>
              <span className="setting-state enabled">Enabled</span>
            </div>

            <div className="quick-setting-item">
              <span className="quick-setting-icon"><Phone size={18} /></span>
              <div>
                <strong>Automatic Retries</strong>
                <small>Maximum 3 attempts</small>
              </div>
              <span className="setting-state enabled">Enabled</span>
            </div>

            <div className="quick-setting-item">
              <span className="quick-setting-icon"><ShieldCheck size={18} /></span>
              <div>
                <strong>Consent Protection</strong>
                <small>Consent check before calls</small>
              </div>
              <span className="setting-state enabled">Enabled</span>
            </div>
          </div>
        </article>

        {/* System Status */}
        <article className="dashboard-panel">
          <div className="panel-heading">
            <div className="panel-title">
              <span className="panel-icon">
                <Server size={21} />
              </span>
              <h3>System Status</h3>
            </div>

            <span className="system-overall-status">
              <i></i> Demo
            </span>
          </div>

          <div className="system-status-list">
            <div className="system-status-item">
              <span className="system-status-icon"><Bot size={18} /></span>
              <div>
                <strong>AI Assistant</strong>
                <small>Demo interface</small>
              </div>
              <span className="system-status-label demo">Demo</span>
            </div>

            <div className="system-status-item">
              <span className="system-status-icon"><CalendarCheck size={18} /></span>
              <div>
                <strong>Reminder Scheduler</strong>
                <small>Backend not connected</small>
              </div>
              <span className="system-status-label pending">Pending</span>
            </div>

            <div className="system-status-item">
              <span className="system-status-icon"><PhoneCall size={18} /></span>
              <div>
                <strong>Calling Service</strong>
                <small>Provider not connected</small>
              </div>
              <span className="system-status-label pending">Pending</span>
            </div>
          </div>
        </article>
      </section>

      {/* Recent Activity */}
      <section className="dashboard-panel recent-activity-panel">
        <div className="panel-heading">
          <div className="panel-title">
            <span className="panel-icon">
              <Activity size={21} />
            </span>
            <h3>Recent Activity</h3>
          </div>

          <button className="period-button">
            All Activity <ChevronDown size={14} />
          </button>
        </div>

        <div className="activity-list">
          {activities.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <div className="activity-item" key={`${activity.title}-${index}`}>
                <span className={`activity-icon ${activity.type}`}>
                  <Icon size={17} />
                </span>

                <div className="activity-information">
                  <strong>{activity.title}</strong>
                  <span>{activity.description}</span>
                </div>

                <small>{activity.time}</small>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
