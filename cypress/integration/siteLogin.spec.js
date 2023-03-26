/// <reference types="Cypress" />
import { commonPage } from "../pageObjects/comonPage"
import { loginPage } from "../pageObjects/loginPage"



beforeEach(() => {
        
    cy.visit("https://magento.softwaretestingboard.com/")
    
})


describe("Account login and creation tab", () => {
    
    
    it("Should display Sign in button", () => {
    
        commonPage.getSignIntBtn().should("be.visible").and("contain", "Sign In")

    })

    it("Should display the Create an account button", () => {
        commonPage.getCreateAcc().should("be.visible").and("contain", "Create an Account")
    })
    


})

describe("Login page", () => {
    beforeEach(() => {
        
        commonPage.getSignIntBtn().click()
        
    })
    it("Should have a username input", () => {
        commonPage.getSignIntBtn().click()
        loginPage.getEmail().should("be.visible").and("have.value", "").and("have.attr", "type", "email")
    })

    it("Should have a password input", () => {
        loginPage.getPass().should("be.visible").and("have.value", "").and("have.attr", "type", "password")
    })

    it("Should have a sign in button", () => {
        loginPage.getLoginBtn().should("be.visible").and("contain","Sign In").and("have.value", "").and("have.attr", "type", "submit")
    })

    it("Should have forgot password button", () => {
        loginPage.getForgotBtn().should("be.visible").and("contain", "Forgot Your Password?").and("have.value", "").and("have.attr", "href")
    })

    it("Should have a create account button", () => {
        loginPage.getNewAccBtn().should("be.visible").and("contain", "Create an Account").and("have.value", "").and("have.attr", "href")
    })


})

describe("User login function", () => {
   beforeEach(() => { 
    commonPage.getSignIntBtn().click()
   })

    it("cannot login with wrong credentials type", () =>{
        cy.url().should("include", "/customer/account/login/referer/")
        loginPage.getEmail().type("standarduser").should("have.value", "standarduser")
        loginPage.getPass().type("standardpass").should("have.value", "standardpass")
        loginPage.getLoginBtn().click()
        loginPage.getEmailErrorText().should("be.visible").and("contain", "Please enter a valid email address (Ex: johndoe@domain.com).")
        //cy.pause()
    })

    it.only("cannot login with wrong credentials", () =>{
        loginPage.getEmail().type("user@test.com").should("have.value", "user@test.com")
        loginPage.getPass().type("pass").should("have.value", "pass")
        loginPage.getLoginBtn().click()
        loginPage.getLoginPageErrorText().should("be.visible").and("contain", "Incorrect CAPTCHA")
    })

    it("can detect the correct login credentials and trigger captcha", () =>{
        loginPage.getEmail().type("roni_cost@example.com").should("have.value", "roni_cost@example.com")
        loginPage.getPass().type("roni_cost3@example.com").should("have.value", "roni_cost3@example.com")
        loginPage.getLoginBtn().click()
        loginPage.getCaptchaErrorText().should("be.visible").and("contain", "Incorrect CAPTCHA")
        loginPage.getCaptchaEl().should("be.visible").and("contain", "Reload captcha")
        cy.get('.message-error > div').should("contain", "Incorrect CAPTCHA")
    })
    

})

describe("'Create new account' function", () => {
        
        let data
        
    beforeEach(() => {
        cy.fixture("example").then((dataf) =>{
            data = dataf; 
        })
        cy.visit("https://magento.softwaretestingboard.com/")
        commonPage.getSignIntBtn().click()
        cy.url().should("include", "/customer/account/login/referer/")

    })

    it("Opens the correct page to create new account button", () =>{
        loginPage.getNewAccBtn().click()
        cy.url().should("include", "/customer/account/create/")
    })
    
    it("Attemps to create a new account with a used e-mail", () =>{
        loginPage.getNewAccBtn().click()
        loginPage.getFirstNameTextEl().should("contain", "First Name").and("be.visible")
        loginPage.getFirstNameFieldEl().type(data.firstName).should("have.value", "Mircea")
        loginPage.getLastNameTextEl().should("contain", "Last Name").and("be.visible")
        loginPage.getLastNameFieldEl().type(data.lastName).should("have.value", "Balan")
        loginPage.getEmailTextEl().should("contain", "Email").and("be.visible")
        loginPage.getEmailFieldEl().type(data.email).should("have.value", "test@test.com")
        loginPage.getPasswordTextEl().should("contain", "Password").and("be.visible")
        loginPage.getPassFieldEl().type(data.password).should("have.value", "abc123XYZ.")
        loginPage.getConfirmPasswordTextEl().should("contain", "Confirm Password").and("be.visible")
        loginPage.getConfirmPassFieldEl().type(data.password).should("have.value", "abc123XYZ.")
        loginPage.getSubmit().click()
        loginPage.getLoginPageErrorText().should("contain", "There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account.").and("be.visible")
    })

    it("Attemps to create a new account with an new e-mail", () =>{
        loginPage.getNewAccBtn().click()
        loginPage.getFirstNameTextEl().should("contain", "First Name").and("be.visible")
        loginPage.getFirstNameFieldEl().type(data.firstName).should("have.value", "Mircea")
        loginPage.getLastNameTextEl().should("contain", "Last Name").and("be.visible")
        loginPage.getLastNameFieldEl().type(data.lastName).should("have.value", "Balan")
        loginPage.getEmailTextEl().should("contain", "Email").and("be.visible")
        cy.randomEmail() // Custom cypress command for random email generator | check ../support/commands.js to see the logic
        loginPage.getPassFieldEl().type(data.password).should("have.value", "abc123XYZ.")
        loginPage.getConfirmPassFieldEl().type(data.password).should("have.value", "abc123XYZ.")
        loginPage.getSubmit().click()
        loginPage.getLoginPageErrorText().should("contain", "Thank you").and("be.visible")
    })
    

   
})
