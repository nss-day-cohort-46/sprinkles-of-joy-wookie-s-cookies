export const Order = (customerOrder) => {
  return `
    <div class="order" id="${customerOrder.id}">
      <p>${new Date(customerOrder.timestamp).toLocaleString('en-US')}</p>
      <p>${customerOrder.status.label}</p>
      <p>Order Number: ${customerOrder.id}</p>
    </div>
  `
}
