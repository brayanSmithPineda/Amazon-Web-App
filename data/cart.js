//We create the cart variable, but we are going to use the data save in local storage, that way it does not dissapear every time we refresh the page

//if local storage is none the we just create and empty list for the car
export let cart =  JSON.parse(localStorage.getItem('cart')) || [];

function saveToLocalStorage(){
    //we create this function to save the cart data into local storage, that way we could mantain the data even if you refresh the page, if we do not do this, then when changing from the amazon main page to the checkout the product items are not going to appear
    localStorage.setItem('cart', JSON.stringify(cart))
}

//We separete the code into this function, to make our file more organize, this basicaaly take the productId, check if its already in the cart, and add it to the cart list 
export function addToCart(productId){
    //we first check if the item is already in our cart so we just increase the quantity, else we add it to the cart
    let item;
    cart.forEach((itemObject) => {
        // console.log(itemObject);
        if (productId === itemObject.productId){
            item = itemObject;
        }
    });

    if (item){
        item.quantity ++;
    } else {
        cart.push({
            productId: productId,
            quantity: 1
        }); 
    };

    //here we are modyfing the cart object, so we have to use localStorage
    saveToLocalStorage();
};

//Remove a product from the cart when we press the delete button

export function removeFromCart(productId){
    const newCart = [];
    cart.forEach((cartItem, index) => {
        if (productId != cartItem.productId){
            newCart.push(cartItem);
        }
    });
     
    cart = newCart;
    //here we are modyfing the cart object, so we have to use localStorage
    saveToLocalStorage();
};