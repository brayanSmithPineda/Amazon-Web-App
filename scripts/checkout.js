/*
Steps to use javascript:

1- Collect the data you need
2- Generate the HTML with JavaScript
3- Make it ineractive
*/

//1- Collect the data: Information about the products that we add to our cart, Image, the name , price and quantity, we already have this data in the cart and products modules, so we just re-use it

import {cart, removeFromCart} from "../data/cart.js";
import {products} from "../data/products.js";
import { formatCurrency } from "./utils/formatingMoney.js";

let cartSummaryHTML = '';
cart.forEach((cartItem, index) => {
    const productId = cartItem.productId;
    let matchingProduct;
    products.forEach((product, index) => {
        
        if (product.id === productId){
            matchingProduct = product;
        }
    });
    const html = `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: Tuesday, June 21
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
            <div class="delivery-option">
                <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Tuesday, June 21
                </div>
                <div class="delivery-option-price">
                    FREE Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Wednesday, June 15
                </div>
                <div class="delivery-option-price">
                    $4.99 - Shipping
                </div>
                </div>
            </div>
            <div class="delivery-option">
                <input type="radio"
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
                <div>
                <div class="delivery-option-date">
                    Monday, June 13
                </div>
                <div class="delivery-option-price">
                    $9.99 - Shipping
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    `;
    cartSummaryHTML += html;
});

document.querySelector(".order-summary").innerHTML = cartSummaryHTML;

//Make it inerative
//1 Every time we click on the Delete button, we remove the product

document.querySelectorAll(".js-delete-button")
    .forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
            const attributeProductId = deleteButton.dataset.productId;
            removeFromCart(attributeProductId);

            const productContainer = document.querySelector(`.js-cart-item-container-${attributeProductId}`);

            productContainer.remove();
        });
    });