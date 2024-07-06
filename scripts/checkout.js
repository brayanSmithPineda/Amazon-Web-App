/*
Steps to use javascript:

1- Collect the data you need
2- Generate the HTML with JavaScript
3- Make it ineractive
*/

//1- Collect the data: Information about the products that we add to our cart, Image, the name , price and quantity, we already have this data in the cart and products modules, so we just re-use it

import {cart, removeFromCart} from "../data/cart.js";
import {products} from "../data/products.js";
import {formatCurrency} from "./utils/formatingMoney.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from "../data/deliveryOptions.js";

//This part of the code loop through the items of the cart, for each item of the cart it check if there is any product in it, if so, then it generate the html code to create the product in the checkout page, if there is no product it does not do anything, this code basically look in each item of the cart to see if there is any of the products in our products variable, if so then it display it.
let cartSummaryHTML = '';
cart.forEach((cartItem, index) => {
    const productId = cartItem.productId;

    let matchingProduct;
    products.forEach((product, index) => {        
        if (product.id === productId){
            matchingProduct = product;
        }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOption;
    deliveryOptions.forEach((option, index) =>{
        if(option.Id === deliveryOptionId){
            deliveryOption = option;
        }
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    
    const html = `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
            <img class="product-image"
            src=${matchingProduct.image}>

            <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-button" data-product-id = ${matchingProduct.id}>
                    Delete
                    </span>
                </div>
            </div>

            <div class="delivery-options">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingProduct, cartItem)}
            </div>
        </div>
    </div>
    `;
    cartSummaryHTML += html;
});

document.querySelector(".order-summary").innerHTML = cartSummaryHTML;

//Make it inerative
//1 Every time we click on the Delete button, we remove the product

//In order to delete a product, we have to take two step, the first one is to delete it from the cart list we created, and the second step is to delete it from the HTML (for this we have to select the container of the remove product and then use the remove method to delete the html)
document.querySelectorAll(".js-delete-button")
    .forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            //we first delete the product from the cart variable
            const attributeProductId = deleteButton.dataset.productId;
            removeFromCart(attributeProductId);

            // and then we delete the html
            const productContainer = document.querySelector(`.js-cart-item-container-${attributeProductId}`);

            productContainer.remove();
        });
    });


// we are going to generate and create the delivery options (date and delivery price) and we are going to update the delivery title,along with the order summary

/* 
Main idea of javascript
1- save the data (date and delivery price)
    Save the data:
      1- delivery id: We need to know which delivery option have been choose for each car item, we need this beacause we have to check the delivery option that we choose, so when cartItem.deliveryoption id === id then we checked that delivery option for that particular cart item, we also need the delivery option in the cart item so we know the days (we can adjust the title with this) and also the price. So we use the id, so we can know the delivery option for each cart item, that means we now the price and days. We need to save the deleivey option id also in the cart object, i know that this id has to be dinamic, you know change every time we select a different delivery option, but that is a step 3 in the "make it dinamic" for now we just can set some default fixed value
      2- daysToDelivery: We need this days for each delivery option beacause we have 3 delivery options (10,3,1), we save the number of days that we can make calculation with the dayjs packege  to caculate the price, the title, and each delivery option title.
      3- price: we need the price for each delivery option, so we can update the order summary
2- generate the html (delivery options, order summary and the delivery title):
    1- For each cart item we need to generate the deliveryoptions html, i know we already generate the html in the ckeckout with javascript, but we write all the three options, we can intead write a function with just one delivery option and change the date, price, and title based on the delivery option we choose.
    2- we also need to generate the html for the title of each cart item
3- make it inerative 
*/

//This function generate the html for the delivery options
function deliveryOptionsHTML(matchingProduct, cartItem){
    let html = '';
    deliveryOptions.forEach((deliveryOption, index) => {

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        const priceString = (deliveryOption.deliveryPrice === 0) ? 'FREE' : `$${formatCurrency(deliveryOption.deliveryPrice)} -`;

        //This isChecked variable ckecked which delivery option is check, in each iteration this variable is false or true, when the option is checke or not, when its true we add the checked attribute to the input HTML so it appears check
        const isChecked = cartItem.deliveryOptionId === deliveryOption.Id;

        html += `
        <div class="delivery-option">
            <input type="radio"
            class="delivery-option-input"
            ${isChecked ?'checked':''}
            name="delivery-option-${matchingProduct.id}">
            <div>
                <div class="delivery-option-date">
                    ${dateString}
                </div>
                <div class="delivery-option-price">
                    ${priceString} Shipping
                </div>
            </div>
        </div>
        `
    })  
    return html;
};
