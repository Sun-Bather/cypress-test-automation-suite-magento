export let loginPage = {
   
    getEmail:() => {
        return cy.get("#email")
    },

    getPass:() => {
        return cy.get("#pass")
    },

    getLoginBtn:() => {
        return cy.get("#send2")
    },

    getForgotBtn:() => {
        return cy.get(".action.remind")
    },

    getNewAccBtn:() => {
        return cy.get(".action.create.primary")
    },

    getEmailErrorText:() => {
        return cy.get("#email-error")
    },

    getLoginPageErrorText:() => {
        return cy.get(".page.messages")
    },

    getCaptchaErrorText:() =>{
        return cy.get(".message-error")
    },

    getCaptchaEl:() => {
        return cy.get("#captcha-container-user_login")
    },

    getFirstNameTextEl:() => {
        return cy.get(".field-name-firstname")
    },

    getLastNameTextEl:() => {
        return cy.get(".field-name-lastname")
    },

    getEmailTextEl:() => {
        return cy.get(".field.required")
    },

    getPasswordTextEl:() => {
        return cy.get(".field.password.required")
    },

    getConfirmPasswordTextEl:() => {
        return cy.get(".field.confirmation.required")
    },

    getFirstNameFieldEl:() => {
        return cy.get("#firstname")
    },

    getLastNameFieldEl:() => {
        return cy.get("#lastname")
    },

    getEmailFieldEl:() => {
        return cy.get("#email_address")
    },

    getPassFieldEl:() => {
        return cy.get("#password")
    },

    getConfirmPassFieldEl:() => {
        return cy.get("#password-confirmation")
    },

    getSubmit:() => {
        return cy.get(".action.submit.primary")
    }

};
