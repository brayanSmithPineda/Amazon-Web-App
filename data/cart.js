export const cart = [
    {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2
    },
    {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1
    }
];


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
