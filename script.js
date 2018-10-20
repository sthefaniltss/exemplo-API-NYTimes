const btnBusca = document.getElementById("btn-busca");
btnBusca.addEventListener("click", trazResultadoDaBusca);
let listaArtigos = [];

function buscaArtigo(){
  return document.getElementById("campo-busca").value;
}

function erro(){
  console.log("erro");
}

function trazResultadoDaBusca(event){
    event.preventDefault();
    const respostaDaBusca = new XMLHttpRequest();
    respostaDaBusca.open("GET", `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${buscaArtigo()}&api-key=ce673143d6864f6db389a73602391fd9 ` )
    respostaDaBusca.onload = carregaPostsComArtigos;
    respostaDaBusca.onerror = erro;
    respostaDaBusca.send();
}

function carregaPostsComArtigos(){
    listaArtigos = JSON.parse(this.responseText)["response"]["docs"];
    exibeArtigos();

}

function exibeArtigos(){
  let exibeBusca = document.getElementById("exibe-busca");
    exibeBusca.innerHTML = 
      `<div class="area-gif"> ${listaArtigos.map(artigo => `
        <div class="gif">
          <p>${artigo.headline.main}</p>
        </div>
        `).join("")}
      </div>`;
}