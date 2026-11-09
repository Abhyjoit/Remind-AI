
import { useMemo, useState } from "react";
import {
  Phone,
  Check,
  CircleX,
  CalendarDays,
  Search,
  ChevronDown,
  ChevronRight,
  Clock,
  X,
  User,
  PhoneCall,
  MessageSquare,
} from "lucide-react";

const today = new Date();

const createCallDate = (hours, minutes) => {
  const date = new Date(today);
  date.setHours(hours, minutes, 0, 0);
  return date;
};

const initialCalls = [
  {
    id: 1,
    recipient: "Janior Name",
    phone: "+91 98765 43210",
    task: "Schender reminder 1",
    date: createCallDate(17, 30),
    duration: "02:45",
    outcome: "Completed",
    attempts: 1,
    transcript: [
      { speaker: "AI Assistant", text: "Hello! I'm RemindAI. I'm calling to remind you about your scheduled task." },
      { speaker: "Recipient", text: "Yes, I remember. I've completed the task." },
      { speaker: "AI Assistant", text: "Wonderful! I've marked your reminder as completed. Have a great day!" },
    ],
  },
  {
    id: 2,
    recipient: "Avelia Smith",
    phone: "+91 98765 43211",
    task: "Task rev reminder 2",
    date: createCallDate(17, 38),
    duration: "00:00",
    outcome: "No Answer",
    attempts: 1,
    transcript: [],
  },
  {
    id: 3,
    recipient: "David Chen",
    phone: "+91 98765 43212",
    task: "Doctor Appointment",
    date: createCallDate(18, 0),
    duration: "00:35",
    outcome: "Busy",
    attempts: 1,
    transcript: [
      { speaker: "AI Assistant", text: "Hello! I'm RemindAI. I'm calling about your doctor appointment reminder." },
      { speaker: "Recipient", text: "I'm busy right now. Please call me later." },
    ],
  },
  {
    id: 4,
    recipient: "Emily Watson",
    phone: "+91 98765 43213",
    task: "Follow-up Call",
    date: createCallDate(18, 20),
    duration: "00:18",
    outcome: "Voicemail",
    attempts: 2,
    transcript: [
      { speaker: "AI Assistant", text: "Hello, this is RemindAI calling with your scheduled reminder. Please call back when convenient." },
    ],
  },
];

const statistics = [
  {
    title: "Total Calls",
    value: "1,232",
    icon: Phone,
    style: "purple",
  },
  {
    title: "Connected",
    value: "56",
    icon: Check,
    style: "green",
  },
  {
    title: "No Answer",
    value: "26",
    icon: CircleX,
    style: "red",
  },
  {
    title: "Follow-ups",
    value: "1",
    icon: CalendarDays,
    style: "purple",
  },
];

function formatCallDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function formatCallTime(date) {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function CallHistory() {
  const [calls] = useState(initialCalls);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("7");
  const [selectedCall, setSelectedCall] = useState(null);

  const filteredCalls = useMemo(() => {
    const query = search.trim().toLowerCase();

    return calls.filter((call) => {
      const matchesSearch =
        !query ||
        call.recipient.toLowerCase().includes(query) ||
        call.phone.toLowerCase().includes(query) ||
        call.task.toLowerCase().includes(query);

      const days = Number(dateFilter);
      const cutoff = new Date(today);
      cutoff.setDate(cutoff.getDate() - days);

      const matchesDate =
        dateFilter === "all" || call.date >= cutoff;

      return matchesSearch && matchesDate;
    });
  }, [calls, search, dateFilter]);

  return (
    <div className="page-content call-history-page">
      {/* Page Header */}
      <header className="call-history-header">
        <div>
          <h1>Call History</h1>
          <p>Track and review your reminder calls.</p>
        </div>
      </header>

      {/* Statistics */}
      <section className="call-statistics-grid">
        {statistics.map((item) => {
          const Icon = item.icon;

          return (
            <article className="call-stat-card" key={item.title}>
              <div className={`call-stat-icon ${item.style}`}>
                <Icon size={27} />
              </div>

              <div className="call-stat-info">
                <p>{item.title}</p>
                <strong>{item.value}</strong>
              </div>
            </article>
          );
        })}
      </section>

      {/* Call History Table */}
      <section className="call-history-panel">
        <div className="call-history-toolbar">
          <label className="call-search-box">
            <Search size={21} />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name or number..."
            />
          </label>

          <label className="call-date-filter">
            <CalendarDays size={20} />

            <select
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
              aria-label="Filter calls by date"
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="all">All Calls</option>
            </select>

            <ChevronDown size={17} />
          </label>
        </div>

        <div className="call-table-wrapper">
          <table className="call-history-table">
            <thead>
              <tr>
                <th>Recipient</th>
                <th>Task</th>
                <th>Date &amp; Time</th>
                <th>Outcome</th>
                <th aria-label="View details"></th>
              </tr>
            </thead>

            <tbody>
              {filteredCalls.length > 0 ? (
                filteredCalls.map((call) => (
                  <tr
                    key={call.id}
                    onClick={() => setSelectedCall(call)}
                    tabIndex={0}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        setSelectedCall(call);
                      }
                    }}
                  >
                    <td>
                      <div className="call-recipient-cell">
                        <strong>{call.recipient}</strong>
                        <span>{call.phone}</span>
                      </div>
                    </td>

                    <td>
                      <span className="call-task-name">{call.task}</span>
                    </td>

                    <td>
                      <div className="call-date-cell">
                        <CalendarDays size={19} />
                        <span>
                          {formatCallDate(call.date)}, {formatCallTime(call.date)}
                        </span>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`call-outcome-badge ${call.outcome
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {call.outcome === "Completed" && <Check size={17} />}
                        {call.outcome === "No Answer" && <CircleX size={17} />}
                        {call.outcome === "Busy" && <Clock size={17} />}
                        {call.outcome === "Voicemail" && <Phone size={17} />}
                        {call.outcome}
                      </span>
                    </td>

                    <td>
                      <button
                        className="call-details-arrow"
                        aria-label={`View ${call.recipient} call details`}
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedCall(call);
                        }}
                      >
                        <ChevronRight size={22} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">
                    <div className="call-history-empty">
                      <Phone size={30} />
                      <strong>No calls found</strong>
                      <span>Try another search or date filter.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="call-history-footer">
          Showing {filteredCalls.length} of {calls.length} demo calls
        </div>
      </section>

      {/* Call Details Modal */}
      {selectedCall && (
        <div
          className="call-details-backdrop"
          onClick={() => setSelectedCall(null)}
        >
          <section
            className="call-details-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="call-details-heading">
              <div>
                <h2>Call Details</h2>
                <p>Review the reminder call information.</p>
              </div>

              <button
                onClick={() => setSelectedCall(null)}
                aria-label="Close call details"
              >
                <X size={21} />
              </button>
            </div>

            <div className="call-detail-person">
              <div className="call-detail-avatar">
                <User size={25} />
              </div>

              <div>
                <strong>{selectedCall.recipient}</strong>
                <span>{selectedCall.phone}</span>
              </div>

              <span
                className={`call-outcome-badge ${selectedCall.outcome
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                {selectedCall.outcome}
              </span>
            </div>

            <div className="call-detail-information">
              <div>
                <span>Reminder task</span>
                <strong>{selectedCall.task}</strong>
              </div>

              <div>
                <span>Date and time</span>
                <strong>
                  {selectedCall.date.toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </strong>
              </div>

              <div>
                <span>Call duration</span>
                <strong>{selectedCall.duration}</strong>
              </div>

              <div>
                <span>Call attempts</span>
                <strong>{selectedCall.attempts}</strong>
              </div>
            </div>

            <div className="call-transcript-section">
              <h3>
                <MessageSquare size={18} />
                Call Transcript
              </h3>

              {selectedCall.transcript.length > 0 ? (
                <div className="call-transcript">
                  {selectedCall.transcript.map((message, index) => (
                    <div
                      className={`transcript-message ${
                        message.speaker === "Recipient" ? "recipient" : "assistant"
                      }`}
                      key={index}
                    >
                      <span>{message.speaker}</span>
                      <p>{message.text}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-transcript">
                  <PhoneCall size={22} />
                  <span>No conversation transcript is available for this call.</span>
                </div>
              )}
            </div>

            <button
              className="close-call-details-button"
              onClick={() => setSelectedCall(null)}
            >
              Close Details
            </button>
          </section>
        </div>
      )}
    </div>
  );
}

export default CallHistory;
