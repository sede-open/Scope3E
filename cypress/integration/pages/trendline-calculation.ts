context('Future trendline calculation logic page', () => {
  describe('when logged-out', () => {
    it('should display the logged-out Home page', () => {
      cy.visit('/trendline-calculation');
      cy.findByText(
        'We’re aiming to be a net-zero emissions energy business by 2050. Join us.'
      ).should('have.length', 1);
      cy.findByText('Supplier Login').should('exist');
    });
  });

  describe('when logged-in', () => {
    beforeEach(() => {
      cy.mockLogin();
    });

    it('should display the Future trendline calculation logic page', () => {
      cy.visit('/trendline-calculation');
      cy.findByText(
        'We’re aiming to be a net-zero emissions energy business by 2050. Join us.'
      ).should('not.exist');
      cy.findByText('Future trendline calculation logic').should('exist');
    });
  });
});
