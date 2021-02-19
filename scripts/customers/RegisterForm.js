import { authHelper } from "../auth/authHelper.js"
import { customerLogin, registerCustomer } from "./CustomerProvider.js"

const eventHub = document.querySelector("#container")
const contentTarget = document.querySelector(".form__register")

let categories = []

export const RegisterForm = () => {
  render()
}

const render = () => {
  if (!authHelper.isUserLoggedIn()) {
    contentTarget.innerHTML = `
      <h3>Register for a customer account</h3>
      <p>Already have an account? Login <a href="#" id="link__login">here</a>.</p>
      <form>
        <fieldset>
        <label for="register-firstName">First: </label>
        <input type="text" id="register-firstName" name="register-firstName">
        </fieldset>
        <fieldset>
        <label for="register-lastName">Last: </label>
        <input type="text" id="register-lastName" name="register-lastName">
        </fieldset>
        <fieldset>
        <label for="register-email">Email: </label>
        <input type="text" id="register-email" name="register-email">
        </fieldset>
        <fieldset>
        <label for="register-password">Password: </label>
        <input type="password" id="register-password" name="register-password">
        </fieldset>
        <fieldset>
        <input type="checkbox" id="register-rewards" name="register-rewards">
        <label for="register-rewards">Yes, I would like to join the rewards program. </label>
        </fieldset>
        <button id="customerRegister">Register</button>
      </form>
    `
  }
}

//Renders the Register Form when the register button is clicked from the Login menu
eventHub.addEventListener("showRegisterForm", Event => {
  render()
})

eventHub.addEventListener("click", evt => {
  if (evt.target.id === "link__login") {
    contentTarget.innerHTML = ""

    const customEvent = new CustomEvent("showLoginForm")
    eventHub.dispatchEvent(customEvent)
  }
  else if (evt.target.id === "customerRegister") {
    evt.preventDefault()
    const registerEmail = document.getElementById("register-email").value
    const registerPassword = document.getElementById("register-password").value
    const registerFirstName = document.getElementById("register-firstName").value
    const registerLastName = document.getElementById("register-lastName").value
    let registerRewards = null
    if (document.getElementById("register-rewards").checked === true) {
      registerRewards = true
    }
    else {registerRewards = false}
    const newCustomer = {
      name: `${registerFirstName} ${registerLastName}`,
      rewardsMember: registerRewards,
      email: registerEmail,
      password: registerPassword
    }
    registerCustomer(newCustomer)
  }
})
