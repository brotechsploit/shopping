const navLink = document.getElementById('nav-links');

function showMenu(){
    navLink.style.right ='0';

}

function hideMenu(){
    navLink.style.right ='-400px';
}



let listProducts =[];
let carts =[];
const listProductsToHTML = document.querySelector('.listProducts');
const listCartToHTML = document.querySelector('.listCart')
const iconCartSpan = document.querySelector('.icon-cart span');


const addDataToHTML =()=>{
    listProductsToHTML.innerHTML ='';
    if(listProducts.length>0){
        listProducts.forEach(product =>{
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML =`
                <img src="${product.image}">
                <h4>${product.name}</h4>
                <div class="price">$${product.price}</div>
                <button class="addCart">AddCart</button>

            `;

            listProductsToHTML.appendChild(newProduct);
        })
    }
}

listProductsToHTML.addEventListener('click',(even)=>{
    let positionClick = even.target;
    if(positionClick.classList.contains('addCart')){
        let product_id =positionClick.parentElement.dataset.id;

        //alert(product_id);
        addToCart(product_id);
    }
})

const addToCart =(product_id)=>{
    let positionThisItemToCart = carts.findIndex((value)=>value.product_id ==product_id);
    if(carts.length <=0){
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    }else if(positionThisItemToCart <0){
        carts.push({
            product_id: product_id,
            quantity: 1
        })
    }else{
        carts[positionThisItemToCart].quantity = carts[positionThisItemToCart].quantity +1;
    }

    console.log(carts);
    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory =()=>{
    localStorage.setItem('cart',JSON.stringify(carts));
}
const addCartToHTML =()=>{
    listCartToHTML.innerHTML ='';
    let totalAmount = 0;
    let totalQuantity = 0;
    const cartTotal = document.querySelector('.cart-total');
    if(carts.length >0){
        carts.forEach(cart =>{
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex((value)=>value.id ==cart.product_id);
            let info =listProducts[positionProduct];
            newCart.innerHTML =`
                <div class="image">
                    <img src="${info.image}" >
                </div>
                <div class="name">
                    ${info.name}
                </div>
                <div class="totalPrice">$${info.price * cart.quantity}</div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">+</span>

                </div>
            `;
            totalAmount +=info.price * cart.quantity;
            listCartToHTML.appendChild(newCart);

        })
    }iconCartSpan.innerHTML = totalQuantity;
    cartTotal.innerHTML = '$' +totalAmount.toFixed(2);
}


listCartToHTML.addEventListener('click',(even)=>{
    let positionClick = even.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let type = 'minus';
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        if(positionClick.classList.contains('plus')){
            type ='plus';
        }
        changeQuantity(product_id,type);
    }
})

const changeQuantity =(product_id,type)=>{
    let positionThisItemCart = carts.findIndex((value)=>value.product_id ==product_id);
    if(positionThisItemCart >=0){
        switch(type){
            case 'plus':
                carts[positionThisItemCart].quantity =carts[positionThisItemCart].quantity +1;
                break;
            default:
                let valueChange = carts[positionThisItemCart].quantity -1;
                if(valueChange >0){
                    carts[positionThisItemCart].quantity = valueChange;

                }else{
                    carts.splice(positionThisItemCart, 1);
                }
            break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}
const initApp =()=>{
    fetch('products.php')
    .then(Response =>Response.json())
    .then(data =>{
        listProducts = data;
        console.log(data);
        addDataToHTML();

        if(localStorage.getItem('cart')){
            carts =JSON.parse(localStorage.getItem('cart'));

            addCartToHTML();
        }
    })
}
initApp();



