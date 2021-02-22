import { bakeryAPI } from "../Settings.js"
import { saveOrderProducts } from "./OrderProductProvider.js"
import { OrderRecieved } from "./OrderSavedMessage.js"
import { OrderList } from "./OrderList.js"

const eventHub = document.querySelector("#container")


let orders = []
let orderNumber = NaN

export const useOrders = () => orders.slice()

//gets orders from API-------------------------------------------------
export const getOrders = () => {
  return fetch(`${bakeryAPI.baseURL}/orders?_expand=status`)
    .then(response => response.json())
    .then(response => {
      orders = response
    })
}

//saves orders to API-------------------------------------------------
export const saveOrder = (order, productsInOrder) => {
  return fetch(`${bakeryAPI.baseURL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(order)
  })
    .then(res => res.json())
    .then(createdOrder => {
      orderNumber = createdOrder.id
      const orderProducts = productsInOrder.map(product => {
        return {
          "orderId": orderNumber,
          "productId": product.id
        }
      })
      return saveOrderProducts(orderProducts)
    })
    .then(() => getOrders())
    .then(() => OrderRecieved(orderNumber))
    .then(dispatchStateChangeEvent)
}

//deletes orders from API-----------------------------------------------
export const deleteOrder = orderId => {
  return fetch(`${bakeryAPI.baseURL}/orders/${orderId}`, {
    method: "DELETE"
  })
      //then gets new array of orders from API
      .then(getOrders)
      //then renders order list to DOM
      .then(OrderList)
}

//listens for delete order and invokes delete function---------------------
eventHub.addEventListener("deleteOrderClicked", event => {
  deleteOrder(event.detail.orderToBeDeleted)
})

//dispatches event that order state has been changed----------------------
const dispatchStateChangeEvent = () => {
  const ordersStateChangedEvent = new CustomEvent("ordersStateChanged")
  eventHub.dispatchEvent(ordersStateChangedEvent)
}
