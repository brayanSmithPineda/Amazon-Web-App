//We create the cart variable, but we are going to use the data save in local storage, that way it does not dissapear every time we refresh the page

//if local storage is none the we just create and empty list for the car
export let cart;

loadFromStorage();

export function loadFromStorage(){
    cart =  JSON.parse(localStorage.getItem('cart'));
    
    if (!cart) {
        cart = [{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        }, {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }];
    };
};

function saveToLocalStorage(){
    //we create this function to save the cart data into local storage, that way we could mantain the data even if you refresh the page, if we do not do this, then when changing from the amazon main page to the checkout the product items are not going to appear
    localStorage.setItem('cart', JSON.stringify(cart));
};

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
            quantity: 1,
            deliveryOptionId: '1'
        }); 
    };

    //here we are modyfing the cart object, so we have to use localStorage
    saveToLocalStorage();
};

//Remove a product from the cart when we press the delete button, we are creating a new list to save the cart withoud including the deleting item and the save the data back to the cart, as we are modyfing the cart variable we then save to local storage.

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

//This function updates the delivery option, this function need to identify which product or cart item we are going to change the deliveryoption id, we identitfy that item with the product id, after identifying which cart item we are going to update then we modify the deliveryoptionid

export function updateDeliveryOption(productId, deliveryOptionId){

    let matchingItem;
    cart.forEach((cartItem, index) =>{
        if (cartItem.productId === productId){
            matchingItem = cartItem;
        }
    });
    /*
    This directly modifies the object within the cart array because matchingItem is a reference to the object in the array, not a copy. That's why we have to save the cart in local storage
    */

    matchingItem.deliveryOptionId = deliveryOptionId;
    
    saveToLocalStorage();
};