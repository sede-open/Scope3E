describe('The abcd Home Page', () => {
  it('should correctly display the logged-out Home page', () => {
    cy.visit('/');
    cy.findByText(
      'We’re aiming to be a net-zero emissions energy business by 2050. Join us.'
    ).should('have.length', 1);
    cy.findByText('Supplier Login').should('exist');
  });
});
