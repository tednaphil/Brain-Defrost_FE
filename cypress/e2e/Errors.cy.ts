describe('Brain Defrost Error Handling', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/Brain-Defrost_FE')
  })
  it('Displays error message if bad path visited', () => {
    cy.visit('http://localhost:3000/Brain-Defrost_FE/badpath')
    .get('.alert-img').should('exist')
    .get('.error-page').contains('h2', 'Uh oh!')
    .get('.error-page').contains('p', 'Page not found')
    .get('.close-btn').contains('Home').click()
    .url().should('eq', 'http://localhost:3000/Brain-Defrost_FE')
    .get('.form-title').contains('Generate A New Trivia Game!')
  })
  it('Displays error message if game cannot be made', () => {
    cy.intercept('POST', 'https://c98a077d-6c2a-4ca9-a867-cf11b6279230.mock.pstmn.io/api/v1/games',
      {
        statusCode: 500,
        body: ''
      }).as('createGameServerErr')
    cy.get('#name').type('creator').should('have.value', 'creator')
    .get('#topic').type('music').should('have.value', 'music')
    .get('#players').clear().type('3').should('have.value', '3')
    .get('#questions').clear().type('2').should('have.value', '2')
    .get('.create-btn').click()
    .get('.alert-modal').contains('h2', 'Alert!')
    .get('.alert-modal').contains('p', 'Couldn\'t create game - 500')
    .get('.close-btn').contains('Close').click()
    .get('alert-modal').should('not.exist')
  })
  // it('Displays message if display name is taken', () => {
  // })
  // it('Displays error message if game cannot be joined', () => {
  // })
  // it('Displays error message if game cannot be started', () => {
  // })
})