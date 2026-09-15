// ---------- DOM Selection ----------
// Frequently used elements are selected once and stored in variables.

const profileCard = document.getElementById("profileCard");
const profileName = document.getElementById("profileName");
const profileProgram = document.getElementById("profileProgram");
const profileYear = document.getElementById("profileYear");
const profileStatus = document.getElementById("profileStatus");
const detailsPanel = document.getElementById("detailsPanel");
const studentIdDisplay = document.getElementById("studentIdDisplay");

const nameInput = document.getElementById("nameInput");
const programInput = document.getElementById("programInput");
const yearInput = document.getElementById("yearInput");
const statusInput = document.getElementById("statusInput");

const updateBtn = document.getElementById("updateBtn");
const toggleDetailsBtn = document.getElementById("toggleDetailsBtn");
const themeBtn = document.getElementById("themeBtn");
const resetBtn = document.getElementById("resetBtn");

const formMessage = document.getElementById("formMessage");

// querySelector is used for the control panel container.
const controlPanel = document.querySelector(".control-panel");

// ---------- Initial State (used by resetProfile) ----------
// The student ID is read from the data attribute rather than hard-coded.
const INITIAL_STATE = {
  name: "Maria Santos",
  program: "BS Information Technology",
  year: "3rd Year",
  status: "active",
  studentId: profileCard ? profileCard.dataset.studentId : "2026-001",
};

// ---------- Required Functions ----------

/**
 * Returns true when the trimmed name contains at least 2 characters.
 */
function isValidStudentName(name) {
  return typeof name === "string" && name.trim().length >= 2;
}

/**
 * Returns "Active" for "active" and "Inactive" for "inactive".
 */
function formatStudentStatus(status) {
  if (status === "active") {
    return "Active";
  }
  if (status === "inactive") {
    return "Inactive";
  }
  return status;
}

/**
 * Updates the profile status text, the data-status attribute, and the
 * active/inactive classes on the profile card. Uses classList so the
 * rest of the className (e.g. "profile-card") is never overwritten.
 */
function setStatus(status) {
  if (!profileCard || !profileStatus) {
    return;
  }

  profileStatus.textContent = formatStudentStatus(status);
  profileCard.dataset.status = status;

  if (status === "active") {
    profileCard.classList.add("active");
    profileCard.classList.remove("inactive");
  } else {
    profileCard.classList.add("inactive");
    profileCard.classList.remove("active");
  }
}

/**
 * Validates the form, then updates the profile card using the current
 * control values. All user-entered text is written with textContent.
 */
function updateProfile() {
  if (!nameInput || !formMessage) {
    return;
  }

  const nameValue = nameInput.value;

  if (!isValidStudentName(nameValue)) {
    formMessage.textContent = "Student name is required";
    return;
  }

  if (profileName) {
    profileName.textContent = nameValue.trim();
  }
  if (profileProgram && programInput) {
    profileProgram.textContent = programInput.value;
  }
  if (profileYear && yearInput) {
    profileYear.textContent = yearInput.value;
  }
  if (statusInput) {
    setStatus(statusInput.value);
  }

  formMessage.textContent = "Profile updated successfully";
}

/**
 * Shows or hides the details panel using classList.toggle().
 */
function toggleDetails() {
  if (!detailsPanel) {
    return;
  }
  detailsPanel.classList.toggle("hidden");
}

/**
 * Toggles the dark-theme class on document.body.
 */
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}

/**
 * Restores the exact initial profile data, status, controls, message,
 * details visibility, and theme.
 */
function resetProfile() {
  if (profileName) {
    profileName.textContent = INITIAL_STATE.name;
  }
  if (profileProgram) {
    profileProgram.textContent = INITIAL_STATE.program;
  }
  if (profileYear) {
    profileYear.textContent = INITIAL_STATE.year;
  }
  setStatus(INITIAL_STATE.status);

  if (nameInput) {
    nameInput.value = "";
  }
  if (programInput) {
    programInput.value = INITIAL_STATE.program;
  }
  if (yearInput) {
    yearInput.value = INITIAL_STATE.year;
  }
  if (statusInput) {
    statusInput.value = INITIAL_STATE.status;
  }

  if (formMessage) {
    formMessage.textContent = "";
  }

  if (detailsPanel) {
    detailsPanel.classList.remove("hidden");
  }

  document.body.classList.remove("dark-theme");
}

// ---------- Initialization ----------

// The displayed student ID comes from the data-student-id attribute,
// not a hard-coded string.
if (profileCard && studentIdDisplay) {
  studentIdDisplay.textContent = `Student ID: ${profileCard.dataset.studentId}`;
}

// ---------- Event Listeners ----------

if (updateBtn) {
  updateBtn.addEventListener("click", updateProfile);
}
if (toggleDetailsBtn) {
  toggleDetailsBtn.addEventListener("click", toggleDetails);
}
if (themeBtn) {
  themeBtn.addEventListener("click", toggleTheme);
}
if (resetBtn) {
  resetBtn.addEventListener("click", resetProfile);
}
