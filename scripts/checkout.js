import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {loadProducts, loadProductsFecth} from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

// we pass to loadProducst this two functions'callbacks', as both of then need the producst array but the backend takes a time to gives us the response, then we pass both functions as an argument to be exucuted once we have the producst array from the backed, we basically execute the code in renderOrderSummary and renderPaymentSummary once we have the products array from the backend

/*
Breakdown:
Anonymous Function: You are creating an anonymous function (() => {...}) that contains calls to both renderOrderSummary() and renderPaymentSummary().

Passing a Function as an Argument: This anonymous function is passed as an argument to the loadProducts function. So technically, loadProducts receives just one function as its parameter.

*/

//Asyn and Await, is just a prefered way to write asyncornis code, just as promises and callbacks
// we use asyn to convert functions into promises
async function loadPage(){
    // for error handling we use try and cathc, we put the code that can cause an error inside try, and then we catchit and display the message
    try{
        //we use throw to manually create an error

        //throw 'Error 1';

        // we use await to wait until a function is execute or the promise to finosh
        await loadProductsFecth();

        // in this case we do not pass loadCart() beacuase that's not a promise is a callback, so we first have to make the promise
        await new Promise((resolve, reject) => {
            //throw 'Error 2'
            loadCart(() =>{
                //This reject lets us create an error in the future when the cart is loaded.
                //eject('Error3');
                resolve();
            });
        });

    } catch (error) {
        console.log('Unexpected Error, Pleas Try Again Later.');
    }
    

    //Then we just render or load the page, asyn and await is a way to write asyncronis code as normal code
    renderOrderSummary();
    renderPaymentSummary();
}
//we have to call the function
loadPage();


//Promises are a way to execute asyncronis code, just like callbacks, in this case a Promise is a class that recive as input a function, and the parameter is also a resolve function. So inside the promise, we waite to the loadProducst to receive the response from the backend,  When you pass resolve as a callback to loadProducts, what you're effectively doing is telling loadProducts to resolve the promise once it has finished loading and processing the products. Once it has finished then you execute the renderOrderSummary and the renderPaymentSummary, here we used callbacks in the loadProducts function and Promises in conjuntion.
/*
Promise.all([
    loadProductsFecth(),
    new Promise((resolve) => {
        loadCart(() =>{
            resolve();
        });
    })
]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/
/*
new Promise((resolve) => {
    loadProducts(() =>{
        resolve();
    });
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary(); 
})
*/
//Callback Execution: Inside loadProducts, once the asynchronous operation (data fetching) completes, it calls the passed function (the callback). Since the callback itself contains calls to renderOrderSummary() and renderPaymentSummary(), executing the callback effectively runs both these functions in sequence.

/*
loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();    
})
*/