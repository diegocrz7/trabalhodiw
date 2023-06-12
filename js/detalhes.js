const urlParams = new URLSearchParams(window.location.search);
const produtoId = urlParams.get('id');

fetch(`https://diwserver.vps.webdock.cloud/products/${produtoId}`)
  .then(res => res.json())
  .then(produto => {
    let str = `
    <div class="col-sm-3 cardVND">
    <div class="row">
      <div class="col">
        <div class="card mt-2 m-auto">
        <img src="${produto.image}" class="card-img-top" alt="Camisa Atletico-MG">
          <div class="card-body">
            <h5 class="card-title" style="font-size: 12px;">${produto.title}</h5>
            <p class="card-text">${produto.description}</p>
            <p class="card-text"><strong>Price:</strong> R$ ${produto.price},00</p>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
    document.getElementById('detalhesProduto').innerHTML = str;
});