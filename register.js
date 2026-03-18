document.getElementById("registerForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Empêche le rechargement de la page

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const message = document.getElementById("message");

  if (password !== confirmPassword) {
    message.textContent = "❌ Les mots de passe ne correspondent pas.";
    message.style.color = "red";
    return;
  }

  if (password.length < 6) {
    message.textContent = "⚠️ Le mot de passe doit contenir au moins 6 caractères.";
    message.style.color = "orange";
    return;
  }

  // Simulation d'inscription réussie
  message.textContent = "✅ Inscription réussie ! Bienvenue " + username;
  message.style.color = "green";

  // Ici tu pourrais envoyer les données vers un serveur avec fetch()
});
