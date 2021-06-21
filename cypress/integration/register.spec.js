describe("testando tela de registro", () => {
    it("entre na tela de registrar", () => {
            cy.visit("/register")
    })
    it("tester formulario", () => {
        cy.get("[data-teste=inputPhone]").type("123")
        cy.get("[data-teste=inputName]").type("felipao")
        cy.get("[data-teste=inputPassword]").type("123")
        cy.get("[data-teste=inputEmail]").type("chama")
        cy.contains('Confirm').click()
        
    })
})