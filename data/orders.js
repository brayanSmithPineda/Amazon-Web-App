export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrders(order){
    //unshisft is to add the order to the orders arrays at the front
    orders.unshift(order);
    saveToStorage();
};

function saveToStorage(){
    //orders is the array, so we save to local storage the array we create at the first line
    localStorage.setItem('orders', JSON.stringify(orders));
};