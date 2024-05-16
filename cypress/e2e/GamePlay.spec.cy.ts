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
    //intercept started game patch when implemented
    //intercept patch request for answer submission when implemented
    cy.visit('http://localhost:3000/Brain-Defrost_FE')
    cy.get('#name').type('creator').should('have.value', 'creator')
    .get('#topic').type('music').should('have.value', 'music')
    .get('#players').clear().type('3').should('have.value', '3')
    .get('#questions').clear().type('2').should('have.value', '2')
    .get('.create-btn').click()
    .get('.start-game-btn').click()
    .get('.question').contains('Who is the lead vocalist of The Beatles?')
    .get('.question-form').children().should('have.length', 5)
    .get('.time-left').contains('20')
    .get('.question-number').contains(1)
    .get('label[for=option0]').contains('Paul McCartney')
    .get('#option0').should('have.value', 'Paul McCartney')
    .get('label[for=option1]').contains('George Harrison')
    .get('#option1').should('have.value', 'George Harrison')
    .get('label[for=option2]').contains('Ringo Starr')
    .get('#option2').should('have.value', 'Ringo Starr')
    .get('label[for=option3]').contains('John Lennon')
    .get('#option3').should('have.value', 'John Lennon')
    .get('.submit-answer-btn').contains('Lock in?').click().contains('Locked In')
    .get('.submit-answer-btn').should('be.disabled')
  })
  it('Shows game stats at the end of the game', () => {
  })
})