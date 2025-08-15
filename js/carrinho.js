const btnAddCarrinho = document.querySelectorAll(".aicionar-carrinho");

btnAddCarrinho.forEach((btn) => {
  btn.addEventListener("click", (evento) => {
    const elementoProduto = evento.target.closest(".produto");
    const produtoID = elementoProduto.dataset.id;
    const produtoNome = elementoProduto.querySelector(".nome").textContent;
    const produtoPreco = parseFloat(
      elementoProduto
        .querySelector(".preco")
        .textContent.replace("R$ ", "")
        .replace(".", "")
        .replace(",", ".")
    );
    const produtoImagem = elementoProduto
      .querySelector(".imagem")
      .getAttribute("src");

    const carrinho = obterProdutosDoCarrinho();

    const produtoExistente = carrinho.find(
      (produto) => produto.id === produtoID
    );

    if (produtoExistente) {
      produtoExistente.quantidade += 1;
    } else {
      carrinho.push({
        id: produtoID,
        nome: produtoNome,
        preco: produtoPreco,
        imagem: produtoImagem,
        quantidade: 1,
      });
    }

    salvarProdutosNoCarrinho(carrinho);

    atualizarContadorCarrinho();
  });
});

function obterProdutosDoCarrinho() {
  const produtos = localStorage.getItem("carrinho");
  return produtos ? JSON.parse(produtos) : [];
}

function salvarProdutosNoCarrinho(carrinho) {
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function atualizarContadorCarrinho() {
  const carrinho = obterProdutosDoCarrinho();
  let total = 0;
  
  carrinho.forEach((produto) => {
    total += produto.quantidade;
  });

  document.getElementById("contador-carrinho").textContent = total;
}

atualizarContadorCarrinho();