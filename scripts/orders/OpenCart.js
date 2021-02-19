import { getProducts, useProducts } from "./../products/ProductProvider.js"
import { authHelper } from "../auth/authHelper.js"
import { getStatuses, useStatuses } from "../statuses/StatusProvider.js"
import { saveOrder } from "./OrderProvider.js"

const eventHub = document.querySelector("#container")
const userCart = document.querySelector(".userCart")

let productsInCart = []

export const OpenCart = () => {
  render()
}

const render = () => {
  let cartHTML = ""
  let totalCost = 0
//Builds HTML for each product in the shopping cart array
  for (const product of productsInCart) {
    cartHTML += `
      <div class="cart">
        <p>${product.name}</p>
        <p>$${product.price.toFixed(2)}</p>
      </div>
    `
    totalCost += product.price
  }

  //puts the shopping cart on the DOM with the total price
  userCart.innerHTML = `
    <div>
    <h4>Cart</h4>
    ${cartHTML}
    <hr/>
    <div class="cart">
    <button id="placeOrder">Place Order</button>
    <p>$${totalCost.toFixed(2)}</p>
    </div>
    </div>
  `
}

//Shows the shopping cart on the DOM
eventHub.addEventListener("showCustomerCart", e => OpenCart())


eventHub.addEventListener("userLoggedOut", e => {
  //resets the cart array and the DOM so that the cart doesnt have a history and doesnt display anything.
  productsInCart = []
  userCart.innerHTML = ""
})

//Puts the new product in the shopping cart when a user clicks to add a product to their cart
eventHub.addEventListener("addToCart", event => {
  //gets productId from event listener
  const productId = event.detail.addedProduct
  //gets all the products
  getProducts()
    .then(() => {
      const allProducts = useProducts()
      //finds the product that matches the id
      const productToBeAdded = allProducts.find(prod => prod.id === productId)
      //adds it to the cart array
      productsInCart.push(productToBeAdded)
      //renders it to the DOM
      OpenCart()
    })
})

eventHub.addEventListener("click", clickEvent => {
  if (clickEvent.target.id === "placeOrder" && productsInCart.length !== 0) {
    const currentCustomerId = parseInt(authHelper.getCurrentUserId())
    getStatuses()
      .then(() => {
        const allStatuses = useStatuses()
        const initialOrderStatus = allStatuses.find(status => status.label.toLowerCase() === "Scheduled".toLowerCase())

        const newOrder = {
          "customerId": currentCustomerId,
          "statusId": initialOrderStatus.id,
          "timestamp": Date.now()
        }

        return saveOrder(newOrder, productsInCart)
      })
  }
})
