//Object Oriented programming is just a way to write code, we basically write code using objects {}, all the code: functions, variables, etc, goes into a dictionary

//in order to create multiple carts without repeating the code we use a class, inside the class we have all the methods, variables, etc. Now every object (carts) that we generate with the Cart class will have access to all the methods, objects and variables. 
class Cart{
 
    //we initilize cartItems and localStorage as undefined, local storage beacuase every cart that we generate must be save in a different location, if we use the same localStorage then we are going to mess the data of every car. and CartItems should be set as undefi in orde create the variable in case none items are passed to the object, is cartItems in undefined then it wiil just create thw two default items we set later. the proprties here (variables) do not use the let or const keywords
    cartItems = undefined;
    //localStoragekey is a proporty that is usefull inside the class, so in order to only be accesed inside the class we made this attribute private with the # sign
    #localStorageKey = undefined;

    // a constructor lets us create some set up code, code that needs to run everytime we crate an object, in this case the localstorage and loadfromstorage are two things we need to do with each object, the localstorage we need it to set up in order to have a location to save the data, and then we need to load the cartitem into localStorage with the function, to pass the input to the class we just past the pareameter in the constructor, in this case the localStorageKey const cart = new Cart('localStorageKey'), this code will always run everytime we create an object
    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        
        this.#loadFromStorage();
    };

    // this is private method, it can olny be accesed inside the class
    #loadFromStorage(){
        //This is referring to the outer object, we use this word so it will always work even if we change the name of the object
        //we create a new list cart-oop so we don't mess the actual local storage
        this.cartItems =  JSON.parse(localStorage.getItem(this.#localStorageKey));
        
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
    };

    saveToLocalStorage(){
        //we create this function to save the cart data into local storage, that way we could mantain the data even if you refresh the page, if we do not do this, then when changing from the amazon main page to the checkout the product items are not going to appear
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    };

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
    };

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
    };

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
    };
};
const cart = new Cart();
const businessCart = new Cart();

console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);