(function(){
    let productsContent = "";
    
    $.get('data/product.json', function(products) {
        $.each(products, function(id, product) {
            productsContent += `
            <div class="col-12 col-md-6 col-lg-4" style="margin-top: 15px; margin-bottom: 15px;">
                <div class="card" data-product='${JSON.stringify(product)}'>
                    <img class="card-img-top" src="${product.image}" alt="Card image cap" style="width: 150px; height: 150px; margin: 0 auto;">
                    <div class="card-body">
                        <h4 class="card-title" style="height:80px; overflow: hidden;">${product.title}</h4>
                        <p class="card-text" style="height: 150px; overflow: hidden;">${product.description}</p>
                        <div class="row">
                            <div class="col">
                                <p class="btn btn-danger btn-block">${product.price} €</p>
                            </div>
                            <div class="col">
                                <a onClick="addProduct('${product.title}',${product.price})" class="btn btn-success btn-block">Add to cart</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
    
            $('.products .row').html(productsContent);
        })
    });
})();