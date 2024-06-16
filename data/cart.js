export const cart = [];


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
    }
};
