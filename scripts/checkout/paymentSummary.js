import {cart} from "../../data/cart.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct, products } from "../../data/products.js";
import { formatCurrency } from "../utils/formatingMoney.js";

export function renderPaymentSummary(){
   //Sometimes to get the data, (1-save the data) we don't need to craete a list, in this case we need a couple variables to save the numbers por de order.

   //1- Items: XXX, total cost without including the shipping cost (cartQuantity * price)
    let cartQuantity = 0;
    let totalCost = 0;
    let shippingCost = 0;
    cart.forEach((cartItem, index) => {
        const matchingProduct = getProduct(cartItem.productId);
        cartQuantity += cartItem.quantity;
        totalCost += matchingProduct.priceCents * cartItem.quantity;
    
        const matchingDeliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingCost += matchingDeliveryOption.deliveryPrice;

    });    
    let totalBeforeTaxes = totalCost + shippingCost;
    let taxes = totalBeforeTaxes*0.1;
    let totalAfterTaxes = totalBeforeTaxes + taxes;

    //Generate HTML
    let html = `
    <div class="payment-summary-title">
        Order Summary
    </div>

    <div class="payment-summary-row">
        <div>Items (${cartQuantity}):</div>
        <div class="payment-summary-money">$${formatCurrency(totalCost)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(shippingCost)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxes)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxes)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalAfterTaxes)}</div>
    </div>

    <button class="place-order-button button-primary">
        Place your order
    </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = html;
};
