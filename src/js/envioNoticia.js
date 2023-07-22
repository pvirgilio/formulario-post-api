let base64image = "";

function addNoticias() {
  const titulo = document.querySelector("input[name=titulo]").value;
  const descricao = document.querySelector("input[name=descricao]").value;
  const conteudo = document.querySelector("textarea[name=conteudo]").value;

  const data = {
    titulo: titulo,
    descricao: descricao,
    conteudo: conteudo,
    base64image: base64image,
  };

  console.log(data);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const apiURL = "https://api-kwi5.onrender.com/v1/api/add/noticia";

  fetch(apiURL, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const btnEnviar = document.querySelector(".btnEnviar");
      document.querySelector("input[name=titulo]").value = "";
      document.querySelector("input[name=descricao]").value = "";
      document.querySelector("textarea[name=conteudo]").value = "";

      document.getElementById("inputImage").value = "";
      document.getElementById("text-convert").value = "";
      // btnEnviar,.addEventListener('click', listener, options)
      if (data["msg"] == "success") {
        btnEnviar.style.background = "green";
        btnEnviar.style.transition = "all 1s";
        btnEnviar.innerHTML = "Adicionado";

        setTimeout(() => {
          btnEnviar.style.background = "";
          btnEnviar.style.transition = "all 1s";
          btnEnviar.innerHTML = "Adicionar Notícia";
        }, 3000);
      } else {
        btnEnviar.style.background = "red";
        btnEnviar.style.transition = "all 1s";
        btnEnviar.innerHTML = "Erro ao adicionar";

        setTimeout(() => {
          btnEnviar.style.background = "";
          btnEnviar.style.transition = "all 1s";
          btnEnviar.innerHTML = "Adicionar Notícia";
        }, 3000);
      }
    })
    .catch((error) => {
      console.log("Ocorreu um erro", error);
    });
}

function verNoticias() {
  const cosultar = document.getElementById("consultar");
  cosultar.addEventListener("click", () => {
    fetch("https://api-kwi5.onrender.com/v1/api/noticias")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log("Erro", error);
      });
  });
}

verNoticias();

function converterImagem() {
  let image = document.getElementById("inputImage").files;
  if (image.length > 0) {
    var imagemCarregada = image[0];

    var lerArquivo = new FileReader();
    lerArquivo.readAsDataURL(imagemCarregada);

    lerArquivo.onload = function (arquivoCarregado) {
      base64image = arquivoCarregado.target.result;
    };
  }

  const converter = document.querySelector("#converter");
  converter.addEventListener("click", () => {
    document.getElementById("text-convert").textContent = `${base64image}`;
  });
}
