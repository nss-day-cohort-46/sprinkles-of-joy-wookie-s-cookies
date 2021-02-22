export const Order = (customerOrder) => {
  let deleteButton = ""
  if (customerOrder.status.id === 1){
    deleteButton = `<p><button id="deleteOrder">Delete Order</button><p>`
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

