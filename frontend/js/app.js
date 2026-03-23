const API = "http://127.0.0.1:8000/api/posts";
const USER = localStorage.getItem("user");

// ================= VISTAS =================
function mostrarVista(id) {
    document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function irInicio(){ mostrarVista("inicio"); cargarPosts(); }
function irCrear(){ mostrarVista("crear"); }
function irPerfil(){ mostrarVista("perfil"); cargarMisPosts(); }
function irIA(){ mostrarVista("ia"); }

function logout(){
    localStorage.clear();
    location.href="login.html";
}

// ================= POSTS =================
async function cargarPosts(){
    const res = await fetch(API);
    const data = await res.json();

    const cont = document.getElementById("posts");
    cont.innerHTML = "";

    data.forEach(p=>{
        cont.innerHTML += `
        <div class="post">
            <h3>${p.titulo}</h3>
            <p>${p.contenido}</p>
            ${p.imagen ? `<img src="${p.imagen}" class="img">` : ""}
            
            <div>
                ❤️ ${p.likes || 0}
                <button onclick="like('${p._id}')">Like</button>
            </div>

            <input id="c-${p._id}" placeholder="Comentar">
            <button onclick="comentar('${p._id}')">Enviar</button>

            <div>
                ${(p.comentarios || []).map(c=>`<p>💬 ${c}</p>`).join("")}
            </div>
        </div>`;
    });
}

async function crearPost(){
    const titulo = document.getElementById("titulo").value;
    const contenido = document.getElementById("contenido").value;
    const imagen = document.getElementById("imagen").value;

    await fetch(API,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({titulo,contenido,autor:USER,imagen})
    });

    irInicio();
}

// ================= PERFIL =================
async function cargarMisPosts(){
    document.getElementById("usuario").innerText = "Usuario: " + USER;

    const res = await fetch(API + "/user/" + USER);
    const data = await res.json();

    const cont = document.getElementById("misPosts");
    cont.innerHTML = "";

    data.forEach(p=>{
        cont.innerHTML += `<div class="post">
            <h3>${p.titulo}</h3>
            <p>${p.contenido}</p>
        </div>`;
    });
}

// ================= LIKE =================
async function like(id){
    await fetch(API+"/like/"+id,{method:"POST"});
    cargarPosts();
}

// ================= COMENTARIOS =================
async function comentar(id){
    const texto = document.getElementById(`c-${id}`).value;

    await fetch(API+"/comment",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({post_id:id,texto})
    });

    cargarPosts();
}

// ================= IA =================
async function preguntarIA(){
    const pregunta = document.getElementById("pregunta").value;

    const res = await fetch("http://127.0.0.1:8000/api/ia",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({pregunta})
    });

    const data = await res.json();

    document.getElementById("chat").innerHTML += `
        <p>🧑 ${pregunta}</p>
        <p>🤖 ${data.respuesta}</p>
    `;
}

function irPerfil(){
    window.location.href = "perfil.html";
}

function logout(){
    localStorage.clear();
    window.location.href = "login.html";
}

cargarPosts();