const eventHub = document.querySelector("#container")
const contentContainer = document.querySelector(".disappearingMessages")

const ReviewSubmitted = lastCustomerOrder => {
    render()
}

const render = () => {
    contentContainer.innerHTML = `
  <div id="reviewSubmittedMessage__modal" class="modal--parent">
        <div class="modal--content">
        <h3>Your Review Has Been Submitted</h3>
        </div>
    </div>
      `
}

eventHub.addEventListener("newReviewAdded", event => {
    ReviewSubmitted()
    setTimeout(clsoeModal(), 2000)
})

//clears modal HTML
const closeModal = () => {
    contentContainer.innerHTML = ""
}
