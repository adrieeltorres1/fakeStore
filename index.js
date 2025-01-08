let products = [];
let filter = [];

function getProducts(){
    fetch("https://fakestoreapi.com/products")
    .then(resposta => resposta.json())
    .then(resposta => {
        products = resposta;
        insertProducts(products);
    })
} 

getProducts();

function getCategories(){
    fetch("https://fakestoreapi.com/products/categories")
    .then(resposta => resposta.json())
    .then(resposta => {
        resposta.map(categoria => {
            filtro_categorias.innerHTML += `
                <option>${categoria}</option>
            `;
            filtro_categorias_mobile.innerHTML += `
                <option>${categoria}</option>
            `;
        })
    })
} 

getCategories();

function filtrarCategoria(){
    // recebe o valor do select
    let categoriaSelecionada = filtro_categorias.value;

    // verifica se a categoria selecionada é igual a "Todos"
    if(categoriaSelecionada == "Todos"){
        insertProducts(products);
        return;
    }
    // recebe o resultado do filter no caso, estou perguntando se a categoria do produto é igual a categoria selecionada
    let filtrados = products.filter(produto => produto.category == categoriaSelecionada);
    //chamo a função que alimenta a interface com os produtos filtraddos
    insertProducts(filtrados);

    // outra forma de fazer a mesma coisa
    // insertProducts(products.filter((produto) => {
    //     if(produto.category == filtro_categorias.value){
    //         return produto;
    //     }
    // }));

    // versão mais reduzida
    // insertProducts(products.filter(produto => produto.category == filtro_categorias.value))
}

function filtrarCategoriaMobile(){
    // recebe o valor do select
    let categoriaSelecionada = filtro_categorias_mobile.value;

    // verifica se a categoria selecionada é igual a "Todos"
    if(categoriaSelecionada == "Todos"){
        insertProducts(products);
        showFilter();
        return;
    }
    // recebe o resultado do filter no caso, estou perguntando se a categoria do produto é igual a categoria selecionada
    let filtrados = products.filter(produto => produto.category == categoriaSelecionada);
    //chamo a função que alimenta a interface com os produtos filtraddos
    insertProducts(filtrados);
    showFilter();

    // outra forma de fazer a mesma coisa
    // insertProducts(products.filter((produto) => {
    //     if(produto.category == filtro_categorias.value){
    //         return produto;
    //     }
    // }));

    // versão mais reduzida
    // insertProducts(products.filter(produto => produto.category == filtro_categorias.value))
}

function ordenarProdutos(){
    // opção escolhida pelo usuario
    let opcao = ordenacao.value;
    let ordenados;
    if(opcao == "price"){
        ordenados = products.toSorted((a, b) => a.price - b.price);
    } else {
        ordenados = products.toSorted((a, b) => b.rating.rate - a.rating.rate);
    }
    insertProducts(ordenados);
    showFilter();
}


function insertProducts(list){
    produtos.innerHTML = '';
    list.map(item => {
        produtos.innerHTML += `
            <div class="border border-gray-400 rounded-md overflow-hidden" title="${item.title}">
                <div class="relative">
                    <h6 class="absolute top-3 right-3 bg-violet-700 text-white px-2 py-1 rounded-md font-bold">${item.rating.rate}</h6>
                    <img src="${item.image}" class="w-full h-[250px] p-3 object-contain" />
                </div>
                <div class="p-3">
                    <h5 class="text-xl md:line-clamp-1">${item.title}</h5>
                    <h6 class="text-violet-700 font-bold mb-3">${item.category}</h6>
                    <h2 class="text-3xl text-right font-bold">R$ ${item.price.toFixed(2)}</h2>
                </div>
            </div>
        `;
    })
}

function showFilter(){
    if(overlay.classList.contains("invisible")){
        overlay.classList.remove("invisible")
        overlay.classList.remove("opacity-0")
        overlay.classList.add("opacity-70")
    }else{
        overlay.classList.add("invisible")
        overlay.classList.remove("opacity-70")
        overlay.classList.add("opacity-0")
    }
    if(gaveta.classList.contains("-right-full")){
        gaveta.classList.remove("-right-full")
        gaveta.classList.add("right-0")
    }else{
        gaveta.classList.add("-right-full")
        gaveta.classList.remove("right-0")
    }
}