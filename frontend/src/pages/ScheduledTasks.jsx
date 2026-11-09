
import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  Pencil,
  Trash2,
  X,
  Phone,
  Bell,
  Check,
} from "lucide-react";

const pad = (value) => String(value).padStart(2, "0");

const toDateKey = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const today = new Date();
const todayKey = toDateKey(today);

const initialTasks = [
  {
    id: 1,
    title: "Client Follow-up",
    recipient: "John Smith",
    date: todayKey,
    time: "10:00",
    status: "Active",
    type: "Call",
  },
  {
    id: 2,
    title: "Project Update Call",
    recipient: "Sarah Johnson",
    date: todayKey,
    time: "14:00",
    status: "Pending",
    type: "Call",
  },
  {
    id: 3,
    title: "Doctor Appointment Reminder",
    recipient: "Michael Brown",
    date: todayKey,
    time: "16:30",
    status: "Active",
    type: "Reminder",
  },
];

const emptyForm = {
  title: "",
  recipient: "",
  phone: "",
  date: todayKey,
  time: "10:00",
};

function ScheduledTasks() {
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(todayKey);
  const [tasks, setTasks] = useState(initialTasks);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const monthName = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const previousMonthDays = new Date(year, month, 0).getDate();

    return Array.from({ length: 42 }, (_, index) => {
      const dayNumber = index - startDay + 1;
      let date;
      let outsideMonth = false;

      if (dayNumber <= 0) {
        date = new Date(year, month - 1, previousMonthDays + dayNumber);
        outsideMonth = true;
      } else if (dayNumber > daysInMonth) {
        date = new Date(year, month + 1, dayNumber - daysInMonth);
        outsideMonth = true;
      } else {
        date = new Date(year, month, dayNumber);
      }

      return {
        date,
        key: toDateKey(date),
        day: date.getDate(),
        outsideMonth,
      };
    });
  }, [currentMonth]);

  const selectedTasks = tasks
    .filter((task) => task.date === selectedDate)
    .sort((a, b) => a.time.localeCompare(b.time));

  const upcomingTasks = tasks
    .filter((task) => task.date >= todayKey)
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));

  const completedCount = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const activeCount = tasks.filter(
    (task) => task.status === "Active"
  ).length;

  const pendingCount = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const changeMonth = (amount) => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + amount,
        1
      )
    );
  };

  const goToToday = () => {
    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(todayKey);
  };

  const openCreateModal = () => {
    setEditingTask(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setForm({
      title: task.title,
      recipient: task.recipient,
      phone: task.phone || "",
      date: task.date,
      time: task.time,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
    setForm(emptyForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingTask) {
      setTasks((previous) =>
        previous.map((task) =>
          task.id === editingTask.id
            ? { ...task, ...form }
            : task
        )
      );
    } else {
      const newTask = {
        id: Date.now(),
        ...form,
        status: "Active",
        type: "Call",
      };

      setTasks((previous) => [...previous, newTask]);
    }

    setSelectedDate(form.date);
    const chosenDate = new Date(`${form.date}T12:00:00`);
    setCurrentMonth(
      new Date(chosenDate.getFullYear(), chosenDate.getMonth(), 1)
    );
    closeModal();
  };

  const deleteTask = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this reminder?"
    );

    if (confirmed) {
      setTasks((previous) => previous.filter((task) => task.id !== id));
    }
  };

  const toggleTaskStatus = (task) => {
    setTasks((previous) =>
      previous.map((item) =>
        item.id === task.id
          ? {
              ...item,
              status: item.status === "Completed" ? "Active" : "Completed",
            }
          : item
      )
    );
  };

  const formatTaskDate = (dateKey) => {
    const date = new Date(`${dateKey}T12:00:00`);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const date = new Date();
    date.setHours(Number(hours), Number(minutes), 0, 0);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const selectedDateLabel = new Date(
    `${selectedDate}T12:00:00`
  ).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="page-content scheduled-page">
      {/* Page Header */}
      <header className="scheduled-header">
        <div>
          <h1>Scheduled Tasks</h1>
          <p>Manage and track your upcoming AI voice reminders.</p>
        </div>

        <button className="create-reminder-button" onClick={openCreateModal}>
          <Plus size={20} />
          Create Reminder
        </button>
      </header>

      {/* Summary Cards */}
      <section className="scheduled-statistics">
        <article className="scheduled-stat-card">
          <span className="scheduled-stat-icon purple">
            <CalendarDays size={21} />
          </span>
          <div>
            <p>Total Scheduled</p>
            <strong>{tasks.length}</strong>
          </div>
        </article>

        <article className="scheduled-stat-card">
          <span className="scheduled-stat-icon blue">
            <Clock size={21} />
          </span>
          <div>
            <p>Active Tasks</p>
            <strong>{activeCount}</strong>
          </div>
        </article>

        <article className="scheduled-stat-card">
          <span className="scheduled-stat-icon orange">
            <Bell size={21} />
          </span>
          <div>
            <p>Pending Tasks</p>
            <strong>{pendingCount}</strong>
          </div>
        </article>

        <article className="scheduled-stat-card">
          <span className="scheduled-stat-icon green">
            <Check size={21} />
          </span>
          <div>
            <p>Completed</p>
            <strong>{completedCount}</strong>
          </div>
        </article>
      </section>

      {/* Calendar and Upcoming Tasks */}
      <section className="scheduled-main-grid">
        {/* Calendar */}
        <article className="scheduled-calendar-panel">
          <div className="calendar-heading">
            <div className="calendar-month-controls">
              <button
                className="calendar-arrow"
                onClick={() => changeMonth(-1)}
                aria-label="Previous month"
              >
                <ChevronLeft size={23} />
              </button>

              <h2>{monthName}</h2>

              <button
                className="calendar-arrow"
                onClick={() => changeMonth(1)}
                aria-label="Next month"
              >
                <ChevronRight size={23} />
              </button>
            </div>

            <button className="today-button" onClick={goToToday}>
              Today
            </button>
          </div>

          <div className="calendar-grid">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day) => (
                <div className="calendar-weekday" key={day}>
                  {day}
                </div>
              )
            )}

            {calendarDays.map((day) => {
              const dayTasks = tasks.filter(
                (task) => task.date === day.key
              );
              const isToday = day.key === todayKey;
              const isSelected = day.key === selectedDate;

              return (
                <button
                  key={day.key}
                  className={`calendar-day ${
                    day.outsideMonth ? "outside-month" : ""
                  } ${isToday ? "is-today" : ""} ${
                    isSelected ? "selected-day" : ""
                  }`}
                  onClick={() => setSelectedDate(day.key)}
                  aria-label={`Select ${day.key}`}
                >
                  <span>{day.day}</span>

                  {dayTasks.length > 0 && (
                    <span className="calendar-dots">
                      {dayTasks.slice(0, 3).map((task) => (
                        <i key={task.id}></i>
                      ))}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="calendar-footer">
            <span><i className="calendar-legend-dot"></i> Scheduled reminders</span>
            <span><i className="calendar-legend-today"></i> Today</span>
          </div>
        </article>

        {/* Upcoming Tasks */}
        <article className="upcoming-tasks-panel">
          <div className="upcoming-heading">
            <div>
              <h2>Upcoming Tasks</h2>
              <p>
                {selectedDate === todayKey
                  ? "Your reminders for today"
                  : selectedDateLabel}
              </p>
            </div>

            <span className="upcoming-count">{selectedTasks.length}</span>
          </div>

          <div className="upcoming-task-list">
            {selectedTasks.length > 0 ? (
              selectedTasks.map((task) => (
                <article className="upcoming-task-card" key={task.id}>
                  <button
                    className={`task-checkbox ${
                      task.status === "Completed" ? "checked" : ""
                    }`}
                    onClick={() => toggleTaskStatus(task)}
                    aria-label="Toggle task completion"
                  >
                    {task.status === "Completed" && <Check size={15} />}
                  </button>

                  <div className="upcoming-task-details">
                    <strong>{task.title}</strong>
                    <span>{task.recipient}</span>
                    <small>
                      {formatTaskDate(task.date)} · {formatTime(task.time)}
                    </small>
                  </div>

                  <div className="upcoming-task-actions">
                    <span
                      className={`task-status ${task.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {task.status}
                    </span>

                    <div className="task-action-buttons">
                      <button
                        onClick={() => openEditModal(task)}
                        aria-label="Edit reminder"
                        title="Edit reminder"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        onClick={() => deleteTask(task.id)}
                        aria-label="Cancel reminder"
                        title="Cancel reminder"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-tasks">
                <CalendarDays size={34} />
                <strong>No reminders on this date</strong>
                <span>Select another date or create a reminder.</span>
                <button onClick={openCreateModal}>
                  <Plus size={16} /> Create Reminder
                </button>
              </div>
            )}
          </div>

          <div className="upcoming-footer">
            <button
              className="show-upcoming-button"
              onClick={() => {
                setSelectedDate(upcomingTasks[0]?.date || todayKey);
                if (upcomingTasks[0]) {
                  const date = new Date(`${upcomingTasks[0].date}T12:00:00`);
                  setCurrentMonth(
                    new Date(date.getFullYear(), date.getMonth(), 1)
                  );
                }
              }}
            >
              Next upcoming task <ArrowRightIcon />
            </button>
          </div>
        </article>
      </section>

      {/* All Upcoming Reminders */}
      <section className="scheduled-all-tasks-panel">
        <div className="all-tasks-heading">
          <div>
            <h2>All Scheduled Reminders</h2>
            <p>Manage all your reminder tasks in one place.</p>
          </div>
          <span>{upcomingTasks.length} upcoming</span>
        </div>

        <div className="all-tasks-list">
          {upcomingTasks.length > 0 ? (
            upcomingTasks.map((task) => (
              <div className="all-task-row" key={task.id}>
                <div className="all-task-icon">
                  {task.type === "Call" ? (
                    <Phone size={18} />
                  ) : (
                    <Bell size={18} />
                  )}
                </div>

                <div className="all-task-info">
                  <strong>{task.title}</strong>
                  <span>{task.recipient}</span>
                </div>

                <div className="all-task-date">
                  <strong>{formatTaskDate(task.date)}</strong>
                  <span>{formatTime(task.time)}</span>
                </div>

                <span
                  className={`task-status ${task.status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {task.status}
                </span>

                <div className="task-action-buttons">
                  <button
                    onClick={() => openEditModal(task)}
                    aria-label="Edit reminder"
                    title="Edit reminder"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    aria-label="Cancel reminder"
                    title="Cancel reminder"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-upcoming-message">
              No upcoming reminders. Create a new reminder to get started.
            </p>
          )}
        </div>
      </section>

      {/* Create / Edit Reminder Modal */}
      {modalOpen && (
        <div className="reminder-modal-backdrop" onClick={closeModal}>
          <section
            className="reminder-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="reminder-modal-heading">
              <div>
                <h2>{editingTask ? "Edit Reminder" : "Create Reminder"}</h2>
                <p>Enter the details for your AI voice reminder.</p>
              </div>

              <button onClick={closeModal} aria-label="Close modal">
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <label>
                Task title
                <input
                  required
                  value={form.title}
                  onChange={(event) =>
                    setForm({ ...form, title: event.target.value })
                  }
                  placeholder="e.g. Meeting reminder"
                />
              </label>

              <label>
                Recipient name
                <input
                  required
                  value={form.recipient}
                  onChange={(event) =>
                    setForm({ ...form, recipient: event.target.value })
                  }
                  placeholder="Enter recipient name"
                />
              </label>

              <label>
                Recipient phone number
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(event) =>
                    setForm({ ...form, phone: event.target.value })
                  }
                  placeholder="Enter phone number"
                />
              </label>

              <div className="reminder-form-row">
                <label>
                  Date
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(event) =>
                      setForm({ ...form, date: event.target.value })
                    }
                  />
                </label>

                <label>
                  Time
                  <input
                    type="time"
                    required
                    value={form.time}
                    onChange={(event) =>
                      setForm({ ...form, time: event.target.value })
                    }
                  />
                </label>
              </div>

              <div className="reminder-modal-actions">
                <button
                  type="button"
                  className="cancel-modal-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="save-reminder-button">
                  <Plus size={17} />
                  {editingTask ? "Save Changes" : "Create Reminder"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

function ArrowRightIcon() {
  return <ChevronRight size={16} />;
}

export default ScheduledTasks;
