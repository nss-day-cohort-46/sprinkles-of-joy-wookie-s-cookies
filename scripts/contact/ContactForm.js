import { saveContact } from "./ContactProvider.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".contact")


//listens for when contact link is clicked and begins render function--------------
eventHub.addEventListener("click", event => {
    if(event.target.id === "showContactForm") {
        render()
    }
})

//grabs form input data and creates new object to be saved-------------------------
eventHub.addEventListener("click", event => {
    //if submit button pressed...
    if(event.target.id === "contactSubmit"){
        event.preventDefault()
        //grabs data from form inputs and sets into vars
        const name = document.getElementById("contact-fullName").value
        const email = document.getElementById("contact-email").value
        const message = document.getElementById("contact-message").value
        //creates new object with data from inputs
        const newContact = {
            name: name,
            email: email,
            message: message
        }
        //saves new object to API
        saveContact(newContact)
    //else if close button pressed...
    } else if (event.target.id === "contactClose") {
        //reset content to blank
        event.preventDefault()
        contentTarget.innerHTML = ""
    }
})

//renders contact form to DOM-------------------------------------------------------
const render = () => {
    contentTarget.innerHTML = `
    <h3We'd love to hear from you!</h3>
    <form>
        <fieldset>
        <label for="contact-fullName">Full Name: </label>
        <input type="text" id="contact-fullName" name="contact-fullName">
        </fieldset>

        <fieldset>
        <label for="contact-email">Email: </label>
        <input type="text" id="contact-email" name="contact-email">
        </fieldset>
        
        <fieldset>
        <label for="contact-message">Write message below</label>
        <input type="text" id="contact-message" name="contact-message">
        </fieldset>
        <button id="contactSubmit">Submit</button>
        <button id="contactClose">Close</button>
    </form>
    `
}
