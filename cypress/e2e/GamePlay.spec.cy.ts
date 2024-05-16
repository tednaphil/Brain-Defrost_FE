describe('Brain Defrost GamePlay Stories', () => {
  beforeEach(() => {
    // cy.visit('http://localhost:3000/Brain-Defrost_FE')
  })
  it('Allows user to start and play game', () => {
    cy.intercept('POST', 'https://c98a077d-6c2a-4ca9-a867-cf11b6279230.mock.pstmn.io/api/v1/games',
      {
        statusCode: 201,
        fixture: 'createdGame'
      }).as('createGame')
    cy.visit('http://localhost:3000/Brain-Defrost_FE')
    cy.get('#name').type('creator')
    .get('#topic').type('music')
    .get('#players').clear().type('7')
    .get('#questions').clear().type('8')
    .get('.create-btn').click()
    .get('.start-game-btn').click()
    .get('.question').contains('Who is the lead vocalist of The Beatles?')
    .get('.question-form').children().should('have.length', 5)
    //check timer, question number indicator, option text, and submission button
  })
  it('Allows user to select and submit an answer', () => {
  })

  it('Shows game stats at the end of the game', () => {
  })
})