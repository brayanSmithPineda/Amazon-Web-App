/*
Steps for javascript:
1- Save the data
2- generate the html
3- make it inerative
*/

// 1 Step - Save the data
/*We saved the data but we decides to save it in separete file products.js so we can keep our code clean */
//2 Step - Generate the HTML
import {cart, addToCart} from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';
import { formatCurrency } from './utils/formatingMoney.js';

loadProducts(renderProductsGrid);

//we create a function to pass to the load products becuase is do not do that the code of the amazon.js will execute immediately after the send the http request, and the webpage is not going to display anthing since the backed do not gives us the response immediately, so what are we going to do is execute all these code after we have the response, we do that by put all the code in a function and then execute the code afte the response, this thecnice where we pass a function as an argument to another function to run in the future is called callback
function renderProductsGrid(){
    let productHTML = '';
    products.forEach((product, index) => {
        let html = `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src= ${product.image}>
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                    src="${product.getStarsUrl()}">
                <div class="product-rating-count link-primary">
                    ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
                <select>
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"  
                data-product-id = ${product.id}> 
            Add to Cart
            </button>
        </div>
        `; // we set a data attribute to the add to cart button that way we can identify which product to add when we click the button
        productHTML += html;
    });

    document.querySelector(".products-grid").innerHTML = productHTML;


    //Step 3- make it inerative : Create a cart list to save the data of our product and quantity
    /*1- Save the data in a list of objects **Cart Quantity**
    2- create a funtion that listen to every click we do on the **add button**, each time we click on it we save into our cart variable an object with the id of the product and the quantity
    3- then we display the CartQuantity variable on the webpage
    */

    //We do not move this function to the cart module because it updates the webpage
    function updateCartQuantity(){
        //Save the total count in a variable
        let cartQuantity = 0;
        cart.forEach((item) => {
            cartQuantity += item.quantity;
        })

        document.querySelector('.js-cart-quantity')
            .innerHTML = cartQuantity;
        // we have to use the button when we add the event listernet otherwise we are going to run the code for all the products everytime we click on any button
    }

    document.querySelectorAll('.js-add-to-cart') //This is the list of the Add Buttons  
        .forEach((button) => {
            button.addEventListener('click', () => {
                const productId = button.dataset.productId;  // the dataset property return all the data attributes associated with the button, when we use .productId we are returning just the id data attribute

                addToCart(productId);
                updateCartQuantity();
            });
        }        
    );
};