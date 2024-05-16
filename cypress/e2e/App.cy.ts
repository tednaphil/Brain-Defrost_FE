describe('Brain Defrost User Stories', () => {
  beforeEach(() => {
    // cy.viewport(1025, 700)
    cy.visit('http://localhost:3000/Brain-Defrost_FE')
  })
  it('Displays homepage', () => {
    cy.get('h1').contains('Brain Defrost')
    .get('.form-title').contains('Generate A New Trivia Game!')
    .get('label[for=name]').contains('Choose a display name')
    .get('#name').should('have.value', '')
    .get('label[for=topic]').contains('Topic')
    .get('#topic').should('have.value', '')
    .get('label[for=players]').contains('How many players')
    .get('#players').should('have.value', '1')
    .get('label[for=questions]').contains('How many Questions')
    .get('#questions').should('have.value', '1')
    .get('.create-btn').contains('Create')
    .get('.footer-title').contains('More info about Brain Defrost')
  })
  it('Allows user to generate a new game and see lobby', () => {
    cy.intercept('POST', 'https://c98a077d-6c2a-4ca9-a867-cf11b6279230.mock.pstmn.io/api/v1/games',
      {
        statusCode: 201,
        fixture: 'createdGame'
      }).as('createGame')
    cy.get('#name').type('creator')
    .get('#topic').type('music')
    .get('#players').clear().type('7')
    .get('#questions').clear().type('8')
    .get('.create-btn').click()
    .url().should('eq', 'http://localhost:3000/Brain-Defrost_FE/game/lobby/1')
    .get('.game-topic').contains('music')
    .get('.question-count').contains('8 Questions')
    .get('.join-url-heading').contains('Share the Link to invite players!')
    .get('.join-url-container').children().should('have.length', 2)
    .get('.join-url').contains('http://localhost:3000/Brain-Defrost_FE/join/1')
    //test copy functionality
    .get('.start-game-btn').contains('Start Game!')
    .get('.players-heading').contains('Players')
    .get('.players').contains('p', 'creator')
  })
  it('Allows user to join a game', () => {
    cy.intercept('POST', 'https://c98a077d-6c2a-4ca9-a867-cf11b6279230.mock.pstmn.io/api/v1/games',
      {
        statusCode: 201,
        fixture: 'createdGame'
      }).as('createGame')
    cy.get('#name').type('creator')
    .get('#topic').type('music')
    .get('#players').clear().type('7')
    .get('#questions').clear().type('8')
    .get('.create-btn').click()
    cy.intercept('POST', 'https://c98a077d-6c2a-4ca9-a867-cf11b6279230.mock.pstmn.io/api/v1/games/1/players',
      {
        statusCode: 201,
        fixture: 'createdPlayer2'
      }).as('createPlayer')
    cy.visit('http://localhost:3000/Brain-Defrost_FE/join/1')
    .get('#display-name-input').type('student1')
    .get('#join-game-button').click()
    //check url and lobby content
  })
})