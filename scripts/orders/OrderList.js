import { authHelper } from "../auth/authHelper.js"
import { getCustomer } from "../customers/CustomerProvider.js"
import { Order } from "./Order.js"
import { getOrders, useOrders } from "./OrderProvider.js"

const eventHub = document.querySelector("#container")
const contentContainer = document.querySelector(".userOrders")

let orders = []
let customer = {}
let customerOrders = []

//grabs order history for customer to be displayed------------------------------
const OrderList = () => {
  //gets customer ID from session storage where they are logged in
  let customerId = authHelper.getCurrentUserId()
  //if they are logged in
  if (authHelper.isUserLoggedIn()) {
    //get customer info from API and put into variable
    getCustomer(customerId)
    .then((customerObj) => {
      customer = customerObj
    })
    //then get orders array from API and put into var
    .then(getOrders)
      .then(() => {
        orders = useOrders()
        //filter through array of orders and find each one with 
        //matching customer ID
        customerOrders = orders.filter(order => {
          return order.customerId === customer.id
        })
        render()
      })
  }
}

//renders orderlist to DOM-----------------------------------------------------
const render = () => {
  //maps through array of orders for a specific customer and 
  //converts each order obj to HTML
  const ordersHtmlRepresentation = customerOrders.map(order => Order(order)).join("")
  //converts list of order obj into HTML
  contentContainer.innerHTML = `
  <div id="orders__modal" class="modal--parent">
        <div class="modal--content">
        <h3>Previous Orders</h3>
        <div>
        <h5>Ordered on</h5>
        ${ordersHtmlRepresentation}
        </div>
        <button id="modal--close">Close</button>
        </div>
    </div>
      `
}

//listens for when order history button is selected and calls orderlist
eventHub.addEventListener("showPastOrders", () => {
    OrderList()
  }
)

//listens for close button of orderlist modal 
eventHub.addEventListener("click", event => {
  if (event.target.id === "modal--close") {
    closeModal()
  }
})

//clears modal HTML
const closeModal = () => {
  contentContainer.innerHTML = ""
}
