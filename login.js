const form = document.getElementById("loginForm")

const email = document.getElementById("email")

const password = document.getElementById("password")

const message = document.getElementById("message")

const togglePassword = document.getElementById("togglePassword")

const registerBtn = document.getElementById("registerBtn")


// validation formulaire

form.addEventListener("submit", function(e){

e.preventDefault()

if(email.value === "" || password.value === ""){

message.innerText = "Veuillez remplir tous les champs"

message.style.color = "red"

}

else{

message.innerText = "Connexion réussie 🚀"

message.style.color = "#38bdf8"

}

})


// afficher / cacher mot de passe

togglePassword.addEventListener("click", function(){

if(password.type === "password"){

password.type = "text"

}else{

password.type = "password"

}

})


// bouton inscription

registerBtn.addEventListener("click", function(){

message.innerText = "Redirection vers l'inscription..."

message.style.color = "#38bdf8"

})