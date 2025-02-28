import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import {loadFromStorage, cart} from '../../data/cart.js';
import { loadProducts } from "../../data/products.js";

describe('test suite: renderOrderSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'

    beforeAll((done) => {
        //we need to load the products in order that the renderOrderSummary works, as we need to waite until the backed gives us the response then we use the done() function which just go the the next line after we get the response
        loadProducts(() => {
            done();
        });
    });
    
    beforeEach(() => {
        document.querySelector('.js-test-order-summary').innerHTML = `
        <div class="js-order-summary"></div>
        <div class="payment-summary js-payment-summary"></div>
        `
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
            },
            {
                productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 2,
                deliveryOptionId: '2'
            }]);
        });
        loadFromStorage();
        renderOrderSummary();  
    });

    it('displays the cart', () => {
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');
        document.querySelector('.js-test-order-summary').innerHTML = '';
    });

    it('removes a product', () => {        
        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
        expect(document.querySelector(`js-cart-item-container-${prod1}`)).toEqual(null);
        expect(document.querySelector(`js-cart-item-container-${prod2}`)).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);
        document.querySelector('.js-test-order-summary').innerHTML = '';
    });
});