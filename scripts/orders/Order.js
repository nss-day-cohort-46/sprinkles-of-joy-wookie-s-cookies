export const Order = (customerOrder) => {
  return `
    <div class="order" id="${customerOrder.id}">
      <p>${new Date(customerOrder.timestamp).toLocaleString('en-US')}</p>
      <p>${customerOrder.status.label}</p>
      <p>${customerOrder.customerId}</p>
    </div>
  `
}
