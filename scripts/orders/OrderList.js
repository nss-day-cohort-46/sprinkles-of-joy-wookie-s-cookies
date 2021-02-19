import { authHelper } from "../auth/authHelper.js"
import { getCustomer, useCustomers } from "../customers/CustomerProvider.js"
import { getStatuses, useStatuses } from "../statuses/StatusProvider.js"
import { Order } from "./Order.js"
import { getOrders, useOrders } from "./OrderProvider.js"

const eventHub = document.querySelector("#container")
const contentContainer = document.querySelector(".userOrders")

let orders = []
let customer = {}
let customerOrders = []
let customerId = sessionStorage.getItem("soj-customer-id")
console.log(customerId)

export const OrderList = () => {
  if (authHelper.isUserLoggedIn()) {
    getCustomer(customerId)
    .then((customerObj) => {
      customer = customerObj
    })
    .then(getOrders()
      .then(() => {
        orders = useOrders()
        customerOrders = orders.filter(order => {
          return order.customerId === customer.id
        })
        console.log("custOrd", customerOrders)
        console.log("orders", orders)
        console.log("customer", customer)
        render()
      }))
  }
}

const render = () => {
  const ordersHtmlRepresentation = customerOrders.map(order => Order(order)).join("")

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

eventHub.addEventListener("showPastOrders", () => {
  OrderList()
})

eventHub.addEventListener("click", event => {
  if (event.target.id === "modal--close") {
    closeModal()
  }
})

const closeModal = () => {
  contentContainer.innerHTML = ""
}
