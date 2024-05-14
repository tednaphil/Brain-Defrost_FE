describe('Brain Defrost User Stories', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/Brain-Defrost_FE')
  })
  it('Displays homepage', () => {
    cy.get('h1').contains('Brain Defrost')
  })
  it('Allows user to generate a new game', () => {
    cy.intercept('POST', 'https://c98a077d-6c2a-4ca9-a867-cf11b6279230.mock.pstmn.io/api/v1/games',
      {
        statusCode: 201,
        fixture: 'createdGame'
      }).as('createGame')
    cy.get('#name').type('creator')
    .get('#category').type('music')
    .get('#players').type('7')
    .get('#questions').type('8')
    .get('.create-btn').click()
  })
  it('Allows user to join a game', () => {
    cy.intercept('POST', 'https://c98a077d-6c2a-4ca9-a867-cf11b6279230.mock.pstmn.io/api/v1/games',
      {
        statusCode: 201,
        fixture: 'createdGame'
      }).as('createGame')
    cy.get('#name').type('creator')
    .get('#category').type('music')
    .get('#players').type('7')
    .get('#questions').type('8')
    .get('.create-btn').click()
    cy.intercept('POST', 'https://c98a077d-6c2a-4ca9-a867-cf11b6279230.mock.pstmn.io/api/v1/games/1/players',
      {
        statusCode: 201,
        fixture: 'createdPlayer2'
      }).as('createPlayer')
    cy.visit('http://localhost:3000/Brain-Defrost_FE/join/1')
    .get('#display-name-input').type('student1')
    .get('#join-game-button').click()
  })
})