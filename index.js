//containers:
const allContainers = [...document.querySelectorAll(".container")];
const [
    containerPostsList,
    containerEntrarConta,
    containerRegistrarConta,
    containerLogado,
    containerAddPost,
    containerEditPost,
] = allContainers;

//Elements
const inputUsernameEntrar = document.querySelector("#usernameEntrar");
const inputPasswordEntrar = document.querySelector("#passwordEntrar");

const btnEntrar = document.querySelector("#btnEntrar");
const btnEntrarPaginaInicial = document.querySelector(".entrarMinhaConta");
const btnRegistrarPaginaInicial = document.querySelector(".criarUmaNovaConta");
const btnIrPaginaInicial = document.querySelector(".irPaginaInicial");
const btnIrPaginaInicialEntrar = document.querySelector(
    ".irPaginaInicialEntrar"
);
const btnIrPaginaInicialRegistrar = document.querySelector(
    ".irPaginaInicialRegistrar"
);
const btnNovoPost = document.querySelector("#newPostBtn");
const btnAddNovoPost = document.querySelector("#addNovoPost");
const btnRegistrar = document.querySelector("#btnRegistrar");
const btnSairDaConta = document.querySelector(".sairDaConta");
const btnEntrarMinhaConta = document.querySelector(".entrarNaMinhaConta");
const btnCriarMinhaConta = document.querySelector(".criarNovaConta");
const btnEditarPost = document.querySelector("#editPost");

let allBtnDelete;
let allBtnEdit;
let idEditada;

const avisoSenhaIncorretaEntrar = document.querySelector(
    ".senhasDontMatchEntrar"
);
const avisoUsuarioIncorretoEntrar =
    document.querySelector(".userInvalidEntrar");

const avisoUsuarioIncorretoRegistrar = document.querySelector(".userInvalid");
const avisoSenhaIncorretaRegistrar = document.querySelector(".userInvalid");

const formEntrar = document.querySelector("#entrarForm");

const allPostsList = document.querySelector("#allPostsList");
const allPostsListLogado = document.querySelector("#postsListLogado");

//eventos:
btnEntrarPaginaInicial.addEventListener("click", (e) => {
    e.preventDefault();
    containerPostsList.classList.add("hidden");
    containerRegistrarConta.classList.add("hidden");

    isLogged(currentAccount);
    btnRegistrarPaginaInicial.classList.remove("clicado");
    btnEntrarPaginaInicial.classList.add("clicado");
    btnIrPaginaInicial.classList.remove("clicado");
});
btnIrPaginaInicial.addEventListener("click", (e) => {
    e.preventDefault();
    allPosts();
    containerPostsList.classList.remove("hidden");
    containerRegistrarConta.classList.add("hidden");
    containerLogado.classList.add("hidden");
    containerEntrarConta.classList.add("hidden");
    btnRegistrarPaginaInicial.classList.remove("clicado");
    btnEntrarPaginaInicial.classList.remove("clicado");
    btnIrPaginaInicial.classList.add("clicado");
});

btnIrPaginaInicialEntrar.addEventListener("click", (e) => {
    e.preventDefault();
    allPosts();
    containerPostsList.classList.remove("hidden");
    containerRegistrarConta.classList.add("hidden");
    containerLogado.classList.add("hidden");
    containerEntrarConta.classList.add("hidden");
    btnRegistrarPaginaInicial.classList.remove("clicado");
    btnEntrarPaginaInicial.classList.remove("clicado");
    btnIrPaginaInicial.classList.add("clicado");
});

btnEntrarMinhaConta.addEventListener("click", (e) => {
    e.preventDefault();
    containerPostsList.classList.add("hidden");
    containerRegistrarConta.classList.add("hidden");

    isLogged(currentAccount);
    btnRegistrarPaginaInicial.classList.remove("clicado");
    btnEntrarPaginaInicial.classList.add("clicado");
    btnIrPaginaInicial.classList.remove("clicado");
});

btnIrPaginaInicialRegistrar.addEventListener("click", (e) => {
    e.preventDefault();
    allPosts();
    containerPostsList.classList.remove("hidden");
    containerRegistrarConta.classList.add("hidden");
    containerLogado.classList.add("hidden");
    containerEntrarConta.classList.add("hidden");
    btnRegistrarPaginaInicial.classList.remove("clicado");
    btnEntrarPaginaInicial.classList.remove("clicado");
    btnIrPaginaInicial.classList.add("clicado");
});

btnRegistrarPaginaInicial.addEventListener("click", (e) => {
    e.preventDefault();
    containerPostsList.classList.add("hidden");
    containerRegistrarConta.classList.remove("hidden");
    containerLogado.classList.add("hidden");
    containerEntrarConta.classList.add("hidden");
    btnRegistrarPaginaInicial.classList.add("clicado");
    btnEntrarPaginaInicial.classList.remove("clicado");
    btnIrPaginaInicial.classList.remove("clicado");
});

btnCriarMinhaConta.addEventListener("click", (e) => {
    e.preventDefault();
    containerPostsList.classList.add("hidden");
    containerRegistrarConta.classList.remove("hidden");
    containerLogado.classList.add("hidden");
    containerEntrarConta.classList.add("hidden");
    btnRegistrarPaginaInicial.classList.add("clicado");
    btnEntrarPaginaInicial.classList.remove("clicado");
    btnIrPaginaInicial.classList.remove("clicado");
});

let currentAccount;

async function allPosts() {
    const response = await fetch("http://localhost:3000/allposts");
    const data = await response.json();

    if (data.length > 0) {
        allPostsList.innerHTML = "";
        data.forEach((post, i) => {
            const html = `
            <li>
                <h2>${post.title}</h2>
                <small> ${post.datapost} </small>
                <p>${post.content}</p>
                <small>Por: ${post.author} </small>
            </li>
        `;
            allPostsList.insertAdjacentHTML("afterbegin", html);
        });
    } else {
        allPostsList.innerHTML = "<p class='semposts'>Sem publicações...</p>";
    }
}

allPosts();

function isLogged(currentAccount) {
    if (currentAccount) {
        btnEntrarPaginaInicial.textContent = "Minha conta";
        btnEntrarPaginaInicial.classList.add("jalogado");

        containerEntrarConta.classList.add("hidden");
        containerLogado.classList.remove("hidden");
    } else {
        containerEntrarConta.classList.remove("hidden");
        containerLogado.classList.add("hidden");
    }
}

btnEntrar.addEventListener("click", async (e) => {
    e.preventDefault();
    let username = inputUsernameEntrar.value;
    let password = inputPasswordEntrar.value;

    const response = await fetch(`http://localhost:3000/`);
    const data = await response.json();
    console.log(data);
    const currentUser = data.find((el) => el.username === username);
    console.log(currentUser);
    if (currentUser) {
        const response = await fetch(
            `http://localhost:3000/getuser?username=${username}`
        );
        currentAccount = await response.json();
        console.log(currentAccount);
        if (currentAccount[0].password === password) {
            updatePostsLogged(currentAccount);
        } else {
            avisoUsuarioIncorretoEntrar.classList.add("hidden");
            avisoSenhaIncorretaEntrar.classList.remove("hidden");
        }
    } else {
        avisoSenhaIncorretaEntrar.classList.add("hidden");
        avisoUsuarioIncorretoEntrar.classList.remove("hidden");
    }

    inputUsernameEntrar.value = "";
    inputPasswordEntrar.value = "";
});

async function getPostsLogged(currentAccount) {
    const response = await fetch(
        `http://localhost:3000/getposts?username=${currentAccount[0].username}`
    );
    const data = await response.json();

    allPostsListLogado.innerHTML = "";
    data.forEach((post, i) => {
        const html = `<li>
        <h2>${post.title}</h2>
        <small> ${post.datapost} </small>
        <p>${post.content}</p>
        <small>Por: ${post.author} </small>
        <a class="edit" id='${post.id}'>Editar</a>
        <a class="delete ${post.id}" id='${post.id}'>Deletar</a>
    </li>`;

        allPostsListLogado.insertAdjacentHTML("afterbegin", html);
    });

    allBtnDelete = [...document.querySelectorAll(".delete")];
    allBtnDelete.forEach((btn, i) => {
        btn.addEventListener("click", async () => {
            const response = await fetch(
                `http://localhost:3000/delete?id=${btn.id}`
            );
            const data = await response.json();
            console.log(data);
            updatePostsLogged(currentAccount);
        });
    });

    allBtnEdit = [...document.querySelectorAll(".edit")];
    allBtnEdit.forEach((btn) => {
        btn.addEventListener("click", async () => {
            containerLogado.classList.add("hidden");
            containerEditPost.classList.remove("hidden");
            console.log(btn.id);
            idEditada = Number(btn.id);
        });
    });
}

function updatePostsLogged(currentAccount) {
    containerPostsList.classList.add("hidden");
    containerRegistrarConta.classList.add("hidden");

    containerEntrarConta.classList.add("hidden");
    containerEditPost.classList.add("hidden");
    btnRegistrarPaginaInicial.classList.remove("clicado");
    btnEntrarPaginaInicial.classList.remove("clicado");
    btnIrPaginaInicial.classList.remove("clicado");
    avisoSenhaIncorretaEntrar.classList.add("hidden");
    avisoUsuarioIncorretoEntrar.classList.add("hidden");

    isLogged(currentAccount);

    getPostsLogged(currentAccount);
}

btnNovoPost.addEventListener("click", () => {
    containerLogado.classList.add("hidden");
    containerAddPost.classList.remove("hidden");
});

btnAddNovoPost.addEventListener("click", async (e) => {
    e.preventDefault();
    const title = document.querySelector("#title");
    const content = document.querySelector("#content");
    const author = document.querySelector("#author");
    const username = currentAccount[0].username;

    console.log(title.value, content.value, author.value, username);

    const response = await fetch(
        `http://localhost:3000/add?username=${username}&title=${title.value}&content=${content.value}&author=${author.value}`
    );
    const data = await response.json();

    containerAddPost.classList.add("hidden");
    containerLogado.classList.remove("hidden");

    updatePostsLogged(currentAccount);

    title.value = "";
    content.value = "";
    author.value = "";
});

btnRegistrar.addEventListener("click", async (e) => {
    e.preventDefault();
    const nomeCompleto = document.querySelector("#nomeCompleto");
    const username = document.querySelector("#usernameRegistrar");
    const password = document.querySelector("#passwordRegistar");
    const passwordConfirm = document.querySelector("#passwordConfirm");

    const response = await fetch(`http://localhost:3000/`);
    const data = await response.json();

    const exist = data.find((el) => el.username === username.value);

    if (exist) {
        avisoUsuarioIncorretoRegistrar.classList.remove("hidden");
        avisoSenhaIncorretaEntrar.classList.add("hidden");
    } else {
        if (password.value === passwordConfirm.value) {
            const response = await fetch(
                `http://localhost:3000/newuser?username=${username.value}&password=${password.value}`
            );
            const data = await response.json();
            currentAccount = data;
            updatePostsLogged(currentAccount);
        } else {
            avisoUsuarioIncorretoRegistrar.classList.add("hidden");
            avisoUsuarioIncorretoRegistrar.classList.remove("hidden");
        }
    }

    username.value = "";
    nomeCompleto.value = "";
    password.value = "";
    passwordConfirm.value = "";
});

btnSairDaConta.addEventListener("click", (e) => {
    location.reload();
});

btnEditarPost.addEventListener("click", async (e) => {
    e.preventDefault();
    const title = document.querySelector("#titleEdit");
    const content = document.querySelector("#contentEdit");
    const author = document.querySelector("#authorEdit");

    const response = await fetch(
        `http://localhost:3000/edit?id=${idEditada}&title=${title.value}&content=${content.value}&author=${author.value}`
    );
    const data = await response.json();

    updatePostsLogged(currentAccount);
});
