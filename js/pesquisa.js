fetch("https://diwserver.vps.webdock.cloud/products?page_items=16")
  .then(res => res.json())
  .then(data => {
    console.log(data);
    const products = data.products;
    carregarProdutos(products);
    // Salvar todos os produtos para filtrar posteriormente
    const todosProdutos = [...products];
    // Adicionar evento de envio do formulário de pesquisa

    document.getElementById('searchForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const searchTerm = document.getElementById('searchInput').value.toLowerCase();
      const produtosFiltrados = todosProdutos.filter(product => {
        const productName = product.title.toLowerCase();
        const productId = product.id.toString();
        return productName.includes(searchTerm) || productId.includes(searchTerm);
      });
      carregarProdutos(produtosFiltrados);
      if (searchTerm !== "") {
        document.getElementById("carrosel").style.display = 'none';
      } else {
        document.getElementById("carrosel").style.display = 'flex';
      }
    });
  })
  .catch(error => {
    console.error('Ocorreu um erro ao carregar os dados da API:', error);
});

function carregarProdutos(products) {
  let str = "";
  for (let i = 0; i < products.length; i++) {
    let produto = products[i];
    str += `
        <div class="col-sm-3 cardVND">
            <div class="row">
                <div class="col">
                    <a href="detalhes.html?id=${produto.id}" style="color: black;">
                        <div class="card mt-2 m-auto">
                            <img src="${produto.image}" class="card-img-top" alt="Camisa Atletico-MG">
                            <div class="card-body">
                                <h5 class="card-title" style="font-size: 12px;">${produto.title}</h5>
                                <p class="card-text"></p>
                                <p class="card-text">R$ ${produto.price}</p>
                                <a href="detalhes.html?id=${produto.id}" class="btn btn-dark">COMPRAR</a>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
`;
  }

  document.getElementById('cardsProdutos').innerHTML = str;
}
