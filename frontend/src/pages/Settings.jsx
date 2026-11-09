
import { useState } from "react";
import {
  User,
  Clock,
  Phone,
  ShieldCheck,
  Bell,
  LockKeyhole,
  Globe,
  Mail,
  CheckCircle2,
  Pencil,
  ChevronRight,
  X,
  Plus,
  Trash2,
  Save,
} from "lucide-react";

function Settings() {
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex@remindai.com",
    phone: "+91 98765 43210",
  });

  const [editingProfile, setEditingProfile] = useState(false);
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [callingEnabled, setCallingEnabled] = useState(true);
  const [callingHours, setCallingHours] = useState("08:00 AM – 06:00 PM");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [callNotifications, setCallNotifications] = useState(true);
  const [taskNotifications, setTaskNotifications] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [blockedNumbers, setBlockedNumbers] = useState([
    "+91 90000 00000",
  ]);
  const [newNumber, setNewNumber] = useState("");
  const [consentRequired, setConsentRequired] = useState(true);
  const [optOutProtection, setOptOutProtection] = useState(true);
  const [saved, setSaved] = useState(false);

  const updateProfile = (field, value) => {
    setProfile((previous) => ({ ...previous, [field]: value }));
    setSaved(false);
  };

  const addBlockedNumber = () => {
    const value = newNumber.trim();

    if (!value) return;

    if (blockedNumbers.includes(value)) {
      window.alert("This number is already blocked.");
      return;
    }

    setBlockedNumbers((previous) => [...previous, value]);
    setNewNumber("");
    setSaved(false);
  };

  const removeBlockedNumber = (number) => {
    setBlockedNumbers((previous) =>
      previous.filter((item) => item !== number)
    );
    setSaved(false);
  };

  const saveSettings = (event) => {
    event.preventDefault();
    setEditingProfile(false);
    setSaved(true);
  };

  const SettingToggle = ({ label, icon: Icon, checked, onChange }) => (
    <div className="setting-toggle-row">
      <div className="setting-toggle-label">
        {Icon && <Icon size={22} />}
        <span>{label}</span>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className={`setting-switch ${checked ? "is-on" : ""}`}
        onClick={() => {
          onChange(!checked);
          setSaved(false);
        }}
      >
        <span />
      </button>
    </div>
  );

  return (
    <form className="page-content settings-page" onSubmit={saveSettings}>
      {/* Page Header */}
      <header className="settings-page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your account and calling preferences.</p>
        </div>

        <button className="settings-header-save" type="submit">
          <Save size={17} />
          Save Changes
        </button>
      </header>

      {/* Main Settings Layout */}
      <div className="settings-layout">
        {/* Profile Sidebar */}
        <aside className="settings-profile-card">
          <div className="settings-profile-top">
            <div className="settings-avatar-wrap">
              <div className="settings-avatar">AJ</div>
              <button
                type="button"
                className="settings-avatar-edit"
                aria-label="Edit profile"
                onClick={() => setEditingProfile(!editingProfile)}
              >
                <Pencil size={16} />
              </button>
            </div>

            {!editingProfile ? (
              <>
                <h2>{profile.name}</h2>
                <p>{profile.email}</p>
              </>
            ) : (
              <div className="settings-profile-edit-fields">
                <label>
                  Full Name
                  <input
                    value={profile.name}
                    onChange={(event) =>
                      updateProfile("name", event.target.value)
                    }
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(event) =>
                      updateProfile("email", event.target.value)
                    }
                  />
                </label>
                <label>
                  Phone
                  <input
                    value={profile.phone}
                    onChange={(event) =>
                      updateProfile("phone", event.target.value)
                    }
                  />
                </label>
              </div>
            )}

            <button
              type="button"
              className="settings-edit-profile-button"
              onClick={() => setEditingProfile(!editingProfile)}
            >
              <Pencil size={17} />
              {editingProfile ? "Done Editing" : "Edit Profile"}
            </button>
          </div>

          <div className="settings-profile-divider" />

          <nav className="settings-side-navigation">
            <a className="settings-side-link active" href="#profile-settings">
              <User size={22} />
              <span>Profile Settings</span>
            </a>
            <a className="settings-side-link" href="#calling-preferences">
              <Phone size={22} />
              <span>Calling Preferences</span>
            </a>
            <a className="settings-side-link" href="#timezone-region">
              <Globe size={22} />
              <span>Timezone &amp; Region</span>
            </a>
            <a className="settings-side-link" href="#notifications">
              <Bell size={22} />
              <span>Notifications</span>
            </a>
            <a className="settings-side-link" href="#privacy-security">
              <ShieldCheck size={22} />
              <span>Privacy &amp; Security</span>
            </a>
          </nav>
        </aside>

        {/* Timezone and Region */}
        <section
          className="settings-panel timezone-panel"
          id="timezone-region"
        >
          <div className="settings-panel-heading">
            <span className="settings-panel-icon">
              <Globe size={25} />
            </span>
            <div>
              <h2>Timezone &amp; Region</h2>
              <p>Set your timezone and date format</p>
            </div>
          </div>

          <div className="settings-select-fields">
            <label className="settings-input-group">
              <span>Timezone</span>
              <div className="settings-select-wrap">
                <select
                  value={timezone}
                  onChange={(event) => {
                    setTimezone(event.target.value);
                    setSaved(false);
                  }}
                >
                  <option value="Asia/Kolkata">
                    (UTC+05:30) Asia/Kolkata
                  </option>
                  <option value="Asia/Dubai">
                    (UTC+04:00) Asia/Dubai
                  </option>
                  <option value="Europe/London">
                    (UTC+00:00) Europe/London
                  </option>
                  <option value="Europe/Paris">
                    (UTC+01:00) Europe/Paris
                  </option>
                  <option value="America/New_York">
                    (UTC-05:00) America/New_York
                  </option>
                  <option value="America/Los_Angeles">
                    (UTC-08:00) America/Los_Angeles
                  </option>
                  <option value="Asia/Singapore">
                    (UTC+08:00) Asia/Singapore
                  </option>
                  <option value="Australia/Sydney">
                    (UTC+10:00) Australia/Sydney
                  </option>
                </select>
              </div>
            </label>

            <label className="settings-input-group">
              <span>Date Format</span>
              <div className="settings-select-wrap">
                <select
                  value={dateFormat}
                  onChange={(event) => {
                    setDateFormat(event.target.value);
                    setSaved(false);
                  }}
                >
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </label>
          </div>
        </section>

        {/* Calling Preferences */}
        <section
          className="settings-panel calling-panel"
          id="calling-preferences"
        >
          <div className="settings-panel-heading">
            <span className="settings-panel-icon">
              <Phone size={25} />
            </span>
            <div>
              <h2>Calling Preferences</h2>
              <p>Configure how calls are made</p>
            </div>
          </div>

          <div className="calling-toggle">
            <div className="calling-toggle-icon">
              <Phone size={25} />
            </div>
            <div className="calling-toggle-copy">
              <strong>Allow calling hours</strong>
              <span>Only call within selected hours</span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={callingEnabled}
              aria-label="Allow calling hours"
              className={`setting-switch ${
                callingEnabled ? "is-on" : ""
              }`}
              onClick={() => {
                setCallingEnabled(!callingEnabled);
                setSaved(false);
              }}
            >
              <span />
            </button>
          </div>

          <label className="calling-hours-select">
            <Clock size={25} />
            <select
              value={callingHours}
              disabled={!callingEnabled}
              onChange={(event) => {
                setCallingHours(event.target.value);
                setSaved(false);
              }}
            >
              <option>08:00 AM – 06:00 PM</option>
              <option>09:00 AM – 05:00 PM</option>
              <option>09:00 AM – 06:00 PM</option>
              <option>10:00 AM – 07:00 PM</option>
              <option>08:00 AM – 08:00 PM</option>
            </select>
          </label>
        </section>

        {/* Notifications */}
        <section
          className="settings-panel notifications-panel"
          id="notifications"
        >
          <div className="settings-panel-heading">
            <span className="settings-panel-icon">
              <Bell size={25} />
            </span>
            <div>
              <h2>Notifications</h2>
              <p>Choose what to be notified about</p>
            </div>
          </div>

          <div className="notification-options">
            <SettingToggle
              label="Email Notifications"
              icon={Mail}
              checked={emailNotifications}
              onChange={setEmailNotifications}
            />
            <SettingToggle
              label="Call Reminders"
              icon={Bell}
              checked={callNotifications}
              onChange={setCallNotifications}
            />
            <SettingToggle
              label="Task Updates"
              icon={CheckCircle2}
              checked={taskNotifications}
              onChange={setTaskNotifications}
            />
          </div>
        </section>

        {/* Privacy and Security */}
        <section
          className="settings-panel privacy-panel"
          id="privacy-security"
        >
          <div className="settings-panel-heading">
            <span className="settings-panel-icon">
              <ShieldCheck size={25} />
            </span>
            <div>
              <h2>Privacy &amp; Security</h2>
              <p>Manage your data and access</p>
            </div>
          </div>

          <button
            type="button"
            className="privacy-option"
            onClick={() => setActiveModal("dnc")}
          >
            <span className="privacy-option-icon">
              <LockKeyhole size={24} />
            </span>
            <span className="privacy-option-copy">
              <strong>Do Not Call List</strong>
              <small>Block specific numbers</small>
            </span>
            <ChevronRight size={22} />
          </button>

          <button
            type="button"
            className="privacy-option"
            onClick={() => setActiveModal("privacy")}
          >
            <span className="privacy-option-icon">
              <ShieldCheck size={24} />
            </span>
            <span className="privacy-option-copy">
              <strong>Data &amp; Privacy</strong>
              <small>Control your data</small>
            </span>
            <ChevronRight size={22} />
          </button>
        </section>
      </div>

      {saved && (
        <div className="settings-save-message">
          <CheckCircle2 size={18} />
          Settings saved in this demo session.
        </div>
      )}

      {/* Privacy Modals */}
      {activeModal && (
        <div
          className="settings-modal-backdrop"
          onClick={() => setActiveModal("")}
        >
          <section
            className="settings-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="settings-modal-heading">
              <div>
                <h2>
                  {activeModal === "dnc"
                    ? "Do Not Call List"
                    : "Data & Privacy"}
                </h2>
                <p>
                  {activeModal === "dnc"
                    ? "Manage numbers that must never receive reminder calls."
                    : "Manage the safety and privacy rules for your account."}
                </p>
              </div>

              <button
                type="button"
                aria-label="Close"
                onClick={() => setActiveModal("")}
              >
                <X size={21} />
              </button>
            </div>

            {activeModal === "dnc" ? (
              <>
                <div className="dnc-add-row">
                  <input
                    type="tel"
                    value={newNumber}
                    onChange={(event) => setNewNumber(event.target.value)}
                    placeholder="Enter phone number"
                  />
                  <button type="button" onClick={addBlockedNumber}>
                    <Plus size={17} />
                    Add
                  </button>
                </div>

                <div className="dnc-number-list">
                  {blockedNumbers.length ? (
                    blockedNumbers.map((number) => (
                      <div className="dnc-number-item" key={number}>
                        <span>
                          <LockKeyhole size={17} />
                          {number}
                        </span>
                        <button
                          type="button"
                          aria-label={`Remove ${number}`}
                          onClick={() => removeBlockedNumber(number)}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="settings-modal-empty">
                      No blocked numbers added.
                    </p>
                  )}
                </div>
              </>
            ) : (
              <div className="privacy-controls">
                <SettingToggle
                  label="Require recipient consent"
                  checked={consentRequired}
                  onChange={setConsentRequired}
                />
                <SettingToggle
                  label="Respect opt-out requests"
                  checked={optOutProtection}
                  onChange={setOptOutProtection}
                />
                <p>
                  These are demo preferences. Actual call blocking and consent
                  enforcement must be implemented and verified in the backend
                  before real calls are enabled.
                </p>
              </div>
            )}

            <button
              type="button"
              className="settings-modal-done"
              onClick={() => {
                setActiveModal("");
                setSaved(false);
              }}
            >
              Done
            </button>
          </section>
        </div>
      )}
    </form>
  );
}

export default Settings;
