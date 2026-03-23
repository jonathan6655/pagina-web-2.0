const API = "http://127.0.0.1:8000/api/posts";
const user = localStorage.getItem("user");

await fetch(API, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        titulo,
        contenido,
        autor: user
    })
});

document.getElementById("usuario").innerText = "Usuario: " + user;

async function cargarMisPosts() {
    const res = await fetch(API);
    const data = await res.json();

    const cont = document.getElementById("misPosts");
    cont.innerHTML = "";

    data
        .filter(p => p.autor === user)
        .forEach(p => {
            cont.innerHTML += `
                <div class="post">
                    <h3>${p.titulo}</h3>
                    <p>${p.contenido}</p>
                </div>
            `;
        });
}

cargarMisPosts();