import { bakeryAPI } from "../Settings.js"
import { saveOrderProducts } from "./OrderProductProvider.js"
import { OrderRecieved } from "./OrderSavedMessage.js"

const eventHub = document.querySelector("#container")

let orders = []
let orderNumber = NaN

export const useOrders = () => orders.slice()

export const getOrders = () => {
  return fetch(`${bakeryAPI.baseURL}/orders?_expand=status`)
    .then(response => response.json())
    .then(response => {
      orders = response
    })
}

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

const dispatchStateChangeEvent = () => {
  const ordersStateChangedEvent = new CustomEvent("ordersStateChanged")

  eventHub.dispatchEvent(ordersStateChangedEvent)
}
