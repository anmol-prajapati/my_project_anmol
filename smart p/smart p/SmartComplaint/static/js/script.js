const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
const registerModal = new bootstrap.Modal(document.getElementById("registerModal"));

// Show login modal on page load
window.onload = function () {
  if (localStorage.getItem("isLoggedIn")) {
    document.getElementById("loginForm").classList.add("d-none");
    document.getElementById("logoutSection").classList.remove("d-none");
    document.getElementById("loggedUser").innerText = localStorage.getItem("currentUser");
  } else {
    loginModal.show();
  }
};

// Open login manually
function openLogin() {
  loginModal.show();
}

// Switch to register
document.getElementById("showRegister").addEventListener("click", function () {
  loginModal.hide();
  registerModal.show();
});

// Switch to login
document.getElementById("showLogin").addEventListener("click", function () {
  registerModal.hide();
  loginModal.show();
});

// Register user
document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;

  if (username && password) {
    localStorage.setItem(`user_${username}`, password);
    alert("Registered Successfully!");
    registerModal.hide();
    loginModal.show();
  }
});

// Login user
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const savedPassword = localStorage.getItem(`user_${username}`);

  if (savedPassword && savedPassword === password) {
    localStorage.setItem("isLoggedIn", true);
    localStorage.setItem("currentUser", username);

    document.getElementById("loginForm").classList.add("d-none");
    document.getElementById("logoutSection").classList.remove("d-none");
    document.getElementById("loggedUser").innerText = username;

    alert("Login successful!");
  } else {
    alert("Invalid credentials!");
  }
});

// Logout user
document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");

  document.getElementById("logoutSection").classList.add("d-none");
  document.getElementById("loginForm").classList.remove("d-none");

  document.getElementById("loginUsername").value = "";
  document.getElementById("loginPassword").value = "";

  loginModal.show();
});