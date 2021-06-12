
describe('Go to the site', () => {
  it('can navigate to site', () => {
    cy.visit('http://localhost:3000')
    cy.url().should('include', 'localhost')
  });
});
describe('Check button', () => {
  it('button is disabled at start', () => {
    cy.get("button.btn").should('be.disabled')
  });
});
describe('Can fill out form', () => {
  it('can type first name', () => {
    cy.get('input[name="fname"]')
    .type('Don')
    .should('have.value', 'Don')
  });
  it('can type last name', () => {
    cy.get('input[name="lname"]')
    .type('Doodle')
    .should('have.value', 'Doodle')
  });
  it('can type email', () => {
    cy.get('input[name="email"]')
    .type('don@doodle.com')
    .should('have.value', 'don@doodle.com')
  });
  it('can type password', () => {
    cy.get('input[name="password"]')
    .type('123doodle')
    .should('have.value', '123doodle')
  });
});
describe('Check the checkbox', () => {
  it('checkbox is checked', () => {
    cy.get('input[name="terms"]')
      .not("[disabled]")
      .check()
      .should("be.checked")
  });
});
describe('Unfilled form', () => {
  it('If anything is not filled out', () => {
    cy.get('input[name="fname"]').should("not.have.value");
    cy.get('input[name="lname"]').should("not.have.value");
    cy.get('input[name="email"]').should("not.have.value");
    cy.get('input[name="password"]').should("not.have.value");
    cy.get('input[name="terms"]').should("not.have.value");
  });
});

describe('Submit completed form', () => {
  it('can submit the form', () => {
    cy.get("button.btn").should("not.be.disabled");
  });
});