const API = "http://localhost:8000/api/auth";

async function register() {
    const username = document.getElementById("user").value;
    const password = document.getElementById("pass").value;

    await fetch(API + "/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    });

    alert("Usuario creado");
    window.location.href = "login.html";
}

async function login() {
    const username = document.getElementById("user").value;
    const password = document.getElementById("pass").value;

    const res = await fetch(API + "/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    });

    const data = await res.json();

    if (data.username) {
        localStorage.setItem("user", data.username);
        window.location.href = "perfil.html";
    } else {
        alert("Error login");
    }
}