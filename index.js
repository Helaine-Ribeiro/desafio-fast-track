// exibi todos os produtos na área de produtos
function showAllProducts() {
    // limpa a área de produtos
    const produtoArea = document.querySelector('.produto-area');
    produtoArea.innerHTML = '';

    // itera sobre o array de produtos (produtos) usando o método forEach.
    produtos.forEach(produto => {
        //Para cada produto, a função clona o modelo de produto na lista 
        const produtoItem = document.querySelector('.models .produto-item').cloneNode(true);
        //preenche os dados do produto usando a função preencheDadosDosProdutos()
        preencheDadosDosProdutos(produtoItem, produto);
        //adiciona o produto clonado à área de produtos 
        produtoArea.appendChild(produtoItem);
    });
}

// filtrar os produtos por categoria (feminino, masculino, infantil).
function filterProducts(category) {
    // Filtrar os produtos por categoria
    const filteredProducts = produtos.filter(produto => produto.categoria === category);
  
    // Limpar a área de produtos usando produtoArea.innerHTML = ''.
    const produtoArea = document.querySelector('.produto-area');
    produtoArea.innerHTML = '';

    // Renderizar os produtos filtrados na área de produtos
    filteredProducts.forEach(produto => {
      const produtoItem = document.querySelector('.models .produto-item').cloneNode(true); //clona o modelo de produto na lista
      preencheDadosDosProdutos(produtoItem, produto);//preenche os dados do produto e adiciona o produto clonado à área de produtos
      produtoArea.appendChild(produtoItem);
    });
  }

  //função é chamada quando o usuário realiza uma pesquisa no campo de pesquisa.
  function searchProduct() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    //filtra os produtos pelo nome usando o método filter, criando um novo array chamado filteredProducts.
    const filteredProducts = produtos.filter(produto => produto.nome.toLowerCase().includes(searchTerm));
    //Limpa a área de produtos usando produtoArea.innerHTML = ''.
    const produtoArea = document.querySelector('.produto-area');
    produtoArea.innerHTML = '';

    //Itera sobre o array filteredProducts
    filteredProducts.forEach(produto => {
        //para cada produto, clona o modelo de produto na lista
        const produtoItem = document.querySelector('.models .produto-item').cloneNode(true);
        //preenche os dados do produto usando preencheDadosDosProdutos(), e adiciona o produto clonado à área de produtos.
        preencheDadosDosProdutos(produtoItem, produto);
        produtoArea.appendChild(produtoItem);
    });
}




// criar a variável modalKey sera global
let modalKey = 0

// variavel para controlar a quantidade inicial de pizzas na modal
let quantProdutos = 1

let cart = []; // carrinho


// funcoes auxiliares ou uteis
//Retorna o primeiro elemento HTML que corresponde ao seletor passado como argumento.
const seleciona = (elemento) => document.querySelector(elemento)
//Retorna uma lista com todos os elementos HTML que correspondem ao seletor passado como argumento.
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

//Abre a janela modal definida pela classe .produtoWindowArea aplicando opacidade gradualmente.
const abrirModal = () => {
    seleciona(".produtoWindowArea").style.opacity = 0; // transparente
    seleciona(".produtoWindowArea").style.display = "flex";

    setTimeout(() => seleciona('.produtoWindowArea').style.opacity = 1, 150);
}

//Fecha a janela modal definida pela classe .produtoWindowArea aplicando opacidade gradualmente.
const fecharModal = () => {
    seleciona('.produtoWindowArea').style.opacity = 0 // transparente
    setTimeout(() => seleciona('.produtoWindowArea').style.display = 'none', 500)
}

//Adiciona event listeners aos botões de fechar modal, tanto o botão "Voltar" como o "X" na janela modal, para chamar a função fecharModal()
const botoesFechar = () => {
    // BOTOES FECHAR MODAL
    selecionaTodos('.produtoInfo--cancelButton, .produtoInfo--cancelMobileButton').forEach( (item) => item.addEventListener('click', fecharModal) )
}

//Preenche os dados do produto no item da lista de produtos usando os atributos do objeto item. 
const preencheDadosDosProdutos = (produtoItem, item, index) => {
  
    // setar um atributo para identificar qual elemento foi clicado
	produtoItem.setAttribute('data-key', index)
    produtoItem.querySelector(".produto-item--img img").src = item.imagem
    produtoItem.querySelector('.produto-item--price').innerHTML = `R$ ${item.valor.toFixed(2)}`
    produtoItem.querySelector(".produto-item--name").innerHTML = item.nome
 
}

//Preenche os dados do produto na janela modal usando os atributos do objeto item.
const preencheDadosModal = (item) => {
    seleciona('.produtoBig img').src = item.imagem
    seleciona('.produtoInfo h1').innerHTML = item.nome
    seleciona('.produtoInfo--actualPrice').innerHTML = `R$ ${item.valor.toFixed(2)}`
}

//Obtém o atributo data-key do elemento clicado para identificar qual produto foi selecionado. 
//abrir a janela modal e exibir os detalhes do produto.
const pegarKey = (e) => {
  
    let key = e.target.closest('.produto-item').getAttribute('data-key')
    console.log('Produto clicado ' + key)
    console.log(produtos[key])

    // garantir que a quantidade inicial de produtos é 1
    quantProdutos = 1

    // manter a informação de qual produto foi clicado
    modalKey = key

    return key
}


//Adiciona event listeners aos botões "+" e "-" na janela modal para aumentar e diminuir a quantidade de produtos selecionados pelo usuário.
const mudarQuantidade = () => {

    seleciona('.produtoInfo--qtmais').addEventListener('click', () => {
        quantProdutos++
     
        seleciona('.produtoInfo--qt').innerHTML = quantProdutos
    })

    
    seleciona('.produtoInfo--qtmenos').addEventListener('click', () => {
        if(quantProdutos > 1) {
            quantProdutos--;
            seleciona('.produtoInfo--qt').innerHTML = quantProdutos
        }
    })
}

//Adiciona o produto ao carrinho.
const adicionarNoCarrinho = () => {

    seleciona('.produtoInfo--addButton').addEventListener('click', () => {
      console.log('Adicionar no carrinho');
  //o produto selecionado na janela modal é obtido da lista de produtos (produtos) usando a variável modalKey como índice e identifica o produto selecionado na janela modal.
       const produtoSelecionado = produtos[modalKey];
       //O preço do produto selecionado é atribuído à variável price
      const price = produtoSelecionado.valor;
  //Uma nova estrutura de objeto chamada produto é criada para representar o produto a ser adicionado ao carrinho. 
      const produto = {
        id: produtoSelecionado.id,
        qt: quantProdutos,
        price: parseFloat(price),
      };
 
      const index = cart.findIndex((item) => item.id === produto.id);
  //É feita uma verificação para determinar se o produto já existe no carrinho ou não. Se o produto já estiver no carrinho, a quantidade do produto existente no carrinho é atualizada somando a quantidade selecionada (quantProdutos). Caso contrário, o produto é adicionado ao carrinho usando o método push().
      if (index > -1) {
        cart[index].qt += quantProdutos;
      } else {
        cart.push(produto);
      } 

      // pegar dados da janela modal atual
    console.log("produto " + modalKey);
    // quantidade
    console.log("Quant. " + quantProdutos);
 

  
      fecharModal();//é chamada para fechar a janela modal após o produto ser adicionado ao carrinho.
      abrirCarrinho();//é chamada para abrir a visualização do carrinho após o produto ser adicionado.
      atualizarCarrinho();//é chamada para atualizar a exibição do carrinho com as mudanças feitas (se necessário) após adicionar o produto.
    
    });
  };

  
//Exibe o carrinho de compras quando há itens adicionados.
const abrirCarrinho = () => {
  
    console.log('Qtd de itens no carrinho ' + cart.length)
    //verifica se o carrinho contém itens, se o seu comprimento é maior que 0. 
    if(cart.length > 0) {
        // mostrar o carrinho
	    seleciona('aside').classList.add('show')
        //define o estilo display na barra superior que é exibida quando há itens no carrinho.
        seleciona('header').style.display = 'flex' // mostrar barra superior
    }

    // exibir aside do carrinho no modo mobile
    seleciona('.menu-openner').addEventListener('click', () => {
        // Novamente, verifica-se se o carrinho contém itens antes de exibi-lo no modo mobile.
        if(cart.length > 0) {
            //Adiciona a classe CSS "show" ao elemento <aside> para torná-lo visível.
            seleciona('aside').classList.add('show')
            //Define o estilo left: '0' para o elemento <aside>, movendo-o para a posição esquerda da tela, o que faz com que ele apareça na visualização.
            seleciona('aside').style.left = '0'
        }
    })
}

// Fecha o carrinho de compras ao clicar no botão de fechar no modo mobile.
const fecharCarrinho = () => {
    // fechar o carrinho com o botão X no modo mobile
    seleciona('.menu-closer').addEventListener('click', () => {
   
        seleciona('aside').style.left = '100vw' // usando 100vw ele ficara fora da tela

       
        seleciona('header').style.display = 'flex'
    })
}

//Atualiza a exibição do carrinho de compras, mostrando a quantidade de itens, os itens selecionados e o total a ser pago.
const atualizarCarrinho = () => {
    // exibir número de itens no carrinho
    
	seleciona('.menu-openner span').innerHTML = cart.length
	
	
    //verifica se o tamanho do array cart é maior que zero, se existem itens no carrinho.
	if(cart.length > 0) {

		// mostrar o carrinho
        //Se houver itens no carrinho, adicionamos a classe show ao elemento <aside>. Essa classe é usada para exibir o carrinho de compras na tela.
		seleciona('aside').classList.add('show')
    

		// zerar meu .cart para nao fazer insercoes duplicadas
		seleciona('.cart').innerHTML = ''

        
        //declarando duas variáveis locais para calcular o subtotal e o total a ser pago no carrinho de compras. 
		let subtotal = 0
	
		let total    = 0

        // para preencher os itens do carrinho, calcular subtotal
        //percorre cada elemento do array cart. A variável i representa o índice do elemento no array.
		for(let i in cart) {

	
            //método find() para pegar o item por id
            let produtoItem = produtos.find((item) => item.id === cart[i].id);
            
            console.log(produtoItem)

   // em cada item pegar o subtotal
            subtotal += cart[i].price * cart[i].qt;

         
               //console.log(cart[i].price)
			

// fazer o clone, exibir na telas e depois preencher as informacoes
            let cartItem = seleciona('.models .cart--item').cloneNode(true);+

            //adicionando o item clonado ao carrinho. 
            seleciona(".cart").append(cartItem);
          
            let produtoName = `${produtoItem.nome}`;
          

            //preenchem as informações do item no carrinho clonado. 
            cartItem.querySelector("img").src = produtoItem.imagem;
            cartItem.querySelector(".cart--item-nome").innerHTML = produtoName;
            cartItem.querySelector(".cart--item--qt").innerHTML = cart[i].qt;
      

		
            //adicionando um event listener ao botão "+" do item no carrinho clonado. 
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
              console.log("Clicou no botão mais");
                // adicionar apenas a quantidade que esta neste contexto
                cart[i].qt++;
                // atualizar a quantidade
                atualizarCarrinho();
                
              });
				
//adicionando um event listener ao botão "-" do item no carrinho clonado. 
			cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
				console.log('Clicou no botão menos')
// Nesta condição, é verificado se a quantidade do item no carrinho (representado por cart[i].qt) é maior que 1. 
				if(cart[i].qt > 1) {
				
//quantidade do item no carrinho é decrementada em 1. reduz um item desse tipo no carrinho.
					cart[i].qt--;
 
				} else {
					
 //o item é removido do carrinho usando o método splice(). remove um elemento a partir do índice i. O segundo argumento 1 indica que apenas um elemento será removido.
					cart.splice(i, 1)
				}
//verifica se o carrinho agora está vazio, se o seu comprimento é menor que 1 (ou seja, zero). 
                if (cart.length < 1) {

                    seleciona('header').style.display = 'flex';
                  }

				
				atualizarCarrinho()
			})


            //adicionando o item clonado ao carrinho novamente. 
			seleciona('.cart').append(cartItem)

		} 


	//Atribui o valor do subtotal à variável total. 
		total = subtotal

		
        //atualiza o valor exibido para o subtotal e o total na tela.
        seleciona('.subtotal span:last-child').innerHTML = subtotal.toFixed(2);
        seleciona('.total span:last-child').innerHTML = total.toFixed(2);

	} else {
		// ocultar o carrinho
        seleciona('aside').classList.remove('show');
        seleciona('aside').style.left = '100vw';
	}

   
};




//fecha o carrinho e exibe novamente a barra de navegação.
const finalizarCompra = () => {
  

    seleciona('.cart--finalizar').addEventListener('click', () => {
        console.log('Finalizar compra')

        seleciona('aside').classList.remove('show')
        //define o valor da propriedade CSS left do elemento <aside> como '100vw', o carrinho de compras será movido para a direita da tela, ficando completamente fora da área visível.
        seleciona('aside').style.left = '100vw'
        //define o valor da propriedade CSS display do elemento <header> como 'flex', fará com que a barra de navegação seja exibida novamente na tela.
        seleciona('header').style.display = 'flex'

       
 
       
    })
    
}



// MAPEAR produtos para gerar lista de produtos
produtos.map((item, index ) => {
    //console.log(item)

    //clona o modelo de produto na lista, preenche os dados do produto usando a função auxiliar preencheDadosDosProdutos(), e adiciona o produto clonado à área de produtos .
    let produtoItem = document.querySelector('.models .produto-item').cloneNode(true)
    //console.log(produtoItem)
 
    seleciona('.produto-area').append(produtoItem)

    // preencher os dados de cada produto e adiciona o produto clonado à área de produtos.
    preencheDadosDosProdutos(produtoItem, item, index)
    
    // produto clicado
    produtoItem.querySelector('.produto-item a').addEventListener('click', (e) => {
        e.preventDefault()
        console.log('Clicou no produto')
     
pegarKey(e)
        // abrir janela modal
        abrirModal()

        // preenchimento dos dados
        preencheDadosModal(item)


		// definir quantidade inicial como 1
		seleciona('.produtoInfo--qt').innerHTML = quantProdutos
      
    })

    botoesFechar()
   

}) 



// mudar quantidade com os botoes + e -
mudarQuantidade()



adicionarNoCarrinho()
atualizarCarrinho()
fecharCarrinho()
finalizarCompra()