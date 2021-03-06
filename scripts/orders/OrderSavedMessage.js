const eventHub = document.querySelector("#container")
const contentContainer = document.querySelector(".disappearingMessages")

export const OrderRecieved = lastCustomerOrder => {
        render(lastCustomerOrder)
}

const render = orderNumber => {
  contentContainer.innerHTML = `
  <div id="orderSavedMessage__modal" class="modal--parent">
        <div class="modal--content">
        <h3>Order has been recieved</h3>
        <div class="messageContent">
          <p>Your order number is:</p>
          <p id="orderNumber"><strong>${orderNumber}</strong></p>
        </div>
        <button id="modal--close">Close</button>
        </div>
    </div>
      `
}

//listens for close button of modal 
eventHub.addEventListener("click", event => {
  if (event.target.id === "modal--close") {
    closeModal()
  }
})

//clears modal HTML
const closeModal = () => {
  contentContainer.innerHTML = ""
}
