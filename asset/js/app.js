// console.log(window.location);

let MON_SUPER_SITE = {};

let currItems = [];
let currTotal = 0;

function calcCurrentTotal()
{
    console.log(currTotal);
    $('.curr-total').text(currTotal + "€");
    $('.badge-pill').text(currItems.length);
}

function addProduct(nameP,priceP)
{
    var product = { name:nameP, price:priceP };
    //console.log(productJSON);
    currTotal += product.price;
    currItems.push(product);
    calcCurrentTotal();
}

function refreshPanier()
{
    console.log(currItems);
    $('.list-group-li').html('');
    for(i=0; i<currItems.length; i++) $('.list-group-li').append('<li class="list-group-item d-flex justify-content-between lh-condensed"><div><h6 class="my-0">'+ currItems[i].name +'</h6></div><span class="text-muted">'+ currItems[i].price +'€</span></li>');
    calcCurrentTotal();
}

let addLogoutButton = function () {
    $('.logout').load('templates/partials/_logout.html');
    $('.nav-profile').load('templates/partials/_profile.html');
    $('.nav-panier').load('templates/partials/_panier.html');
}

let addLoginButton = function () {
    $('.login').html(`
        <a href="/#login" class="btn btn-success">Login</a>
    `);
}

let handleRequest = function () {
    let user = {};

    $('.logout').html('');
    $('.panier-nav').html('');
    $('.profile_nav').html('');
    $('.login').html('');

    $.get('security.php', function(response) {
        response = JSON.parse(response);

        if (response.user) {
            MON_SUPER_SITE['security'] = response.user;
            addLogoutButton();
        }
        
        if (!response.user) {
            addLoginButton();
        }

        let baseUrl = window.location.origin;
        let page = "";

        if (window.location.hash === "") {
            page = 'homepage';
        }

        if (window.location.hash !== "") {
            page = window.location.hash.split('#')[1];
        }

        if (!response.user && page !== 'login') {
            window.location.hash = '#homepage';
        }

        if (response.user && page === 'login') {
            window.location.hash = '#homepage';
        }

        $('.container').load('templates/' + page + '.html', function () {
        });
    })
}

handleRequest();

$(window).on('hashchange', handleRequest);

$('body').on('SECURITY_LOGOUT', handleRequest);
