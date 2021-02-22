const eventHub = document.querySelector("#container")

export const Order = (customerOrder) => {
  let deleteButton = ""
  if (customerOrder.status.id === 1){
    deleteButton = `<button id="deleteOrder" value="${customerOrder.id}">Delete Order</button>`
  } 
  return `
    <div class="order" id="${customerOrder.id}">
      <p>${new Date(customerOrder.timestamp).toLocaleString('en-US')}</p>
      <p>${customerOrder.status.label}</p>
      <p>Order Number: ${customerOrder.id}</p>
      </div>
      ${deleteButton}
  `
}

eventHub.addEventListener("click", event => {
  if (event.target.id === "deleteOrder") {
    const deleteOrder = new CustomEvent("deleteOrderClicked", {
      detail: {
        orderToBeDeleted: event.target.value
      }
    }) 
    eventHub.dispatchEvent(deleteOrder)
  }
})