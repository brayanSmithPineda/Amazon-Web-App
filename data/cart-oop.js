//Object Oriented programming is just a way to write code, we basically write code using objects {}, all of out functions, variables, etc, goes into a dictionary

//in order to create multiple carts without repeating the code we use a function (in OOP we use Pascal convention), we use the localStorage Key as a parameter, so the carts do not share the same data of the cart from localStorage, so it can have different quantity of items in the cart
function Cart(localStorageKey){
    const cart = {
        //if local storage is none then we just create and empty list for the car
        cartItems : undefined,
        loadFromStorage(){
            //This is referring to the outer object, we use this word so it will always work even if we change the name of the object
            //we create a new list cart-oop so we don't mess the actual local storage
            this.cartItems =  JSON.parse(localStorage.getItem(localStorageKey));
            
            if (!this.cartItems) {
                this.cartItems = [{
                  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                  quantity: 2,
                  deliveryOptionId: '1'
                }, {
                  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                  quantity: 1,
                  deliveryOptionId: '2'
                }];
            };
        },
        saveToLocalStorage(){
            //we create this function to save the cart data into local storage, that way we could mantain the data even if you refresh the page, if we do not do this, then when changing from the amazon main page to the checkout the product items are not going to appear
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
    
        //We separete the code into this function, to make our file more organize, this basicaaly take the productId, check if its already in the cart, and add it to the cart list 
        AddToCart(productId){
        //we first check if the item is already in our cart so we just increase the quantity, else we add it to the cart
            let item;
            this.cartItems.forEach((itemObject) => {
                // console.log(itemObject);
                if (productId === itemObject.productId){
                    item = itemObject;
                }
            });
    
            if (item){
                item.quantity ++;
            } else {
                this.cartItems.push({
                    productId: productId,
                    quantity: 1,
                    deliveryOptionId: '1'
                }); 
            };
    
        //here we are modyfing the cart object, so we have to use localStorage
            this.saveToLocalStorage();
        },
    
        //Remove a product from the cart when we press the delete button, we are creating a new list to save the cart withoud including the deleting item and the save the data back to the cart, as we are modyfing the cart variable we then save to local storage.
    
        removeFromCart(productId){
            const newCart = [];
            this.cartItems.forEach((cartItem, index) => {
                if (productId != cartItem.productId){
                    newCart.push(cartItem);
                }
            });
            
            this.cartItems = newCart;
            //here we are modyfing the cart object, so we have to use localStorage
            this.saveToLocalStorage();
        },
    
        //This function updates the delivery option, this function need to identify which product or cart item we are going to change the deliveryoption id, we identitfy that item with the product id, after identifying which cart item we are going to update then we modify the deliveryoptionid
    
        updateDeliveryOption(productId, deliveryOptionId){
            let matchingItem;
            this.cartItems.forEach((cartItem, index) =>{
                if (cartItem.productId === productId){
                    matchingItem = cartItem;
                }
            });
            /*
            This directly modifies the object within the cart array because matchingItem is a reference to the object in the array, not a copy. That's why we have to save the cart in local storage
            */
    
            matchingItem.deliveryOptionId = deliveryOptionId;
            
            this.saveToLocalStorage();
        }
    };
    return cart
};

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);
