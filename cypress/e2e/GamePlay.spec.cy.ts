describe('Brain Defrost GamePlay Stories', () => {
  it('Allows user to start and play game', () => {
    cy.intercept('POST', 'https://c98a077d-6c2a-4ca9-a867-cf11b6279230.mock.pstmn.io/api/v1/games',
      {
        statusCode: 201,
        fixture: 'createdGame'
      }).as('createGame')
    cy.intercept('PATCH', 'https://c98a077d-6c2a-4ca9-a867-cf11b6279230.mock.pstmn.io/api/v1/games/1/players/1',
      {
        statusCode: 200,
        fixture: 'patchedPlayer1'
      }).as('updatePlayer1')
    cy.intercept('GET', 'https://c98a077d-6c2a-4ca9-a867-cf11b6279230.mock.pstmn.io/api/v1/games/1/players',
      {
        statusCode: 200,
        fixture: 'intermissionResponse'
      }).as('getIntermission')
    //intercept started game patch when implemented
    cy.visit('http://localhost:3000/Brain-Defrost_FE')
    cy.get('#name').type('creator').should('have.value', 'creator')
    .get('#topic').type('music').should('have.value', 'music')
    .get('#players').clear().type('3').should('have.value', '3')
    .get('#questions').clear().type('2').should('have.value', '2')
    .get('.create-btn').click()

    .get('.start-game-btn').click()
    //check url
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
    .get('#option3').should('have.value', 'John Lennon').click()
    .get('.submit-answer-btn').contains('Lock in?').click().contains('Locked In')
    .get('.submit-answer-btn').should('be.disabled')
    cy.wait(20000)

    .get('.correct-answer-holder').contains('h2', 'The Correct Answer Is:')
    .get('.correct-answer-holder').contains('h3', 'John Lennon')
    .get('.correct-player-display').contains('h2', 'Who got It Right?')
    .get('.correct-player-display').contains('ul', 'creator')
    cy.wait(5000)

    .get('.question').contains('Which artist is known as the \'Queen of Pop\'?')
    .get('.question-form').children().should('have.length', 5)
    .get('.time-left').contains('20')
    .get('.question-number').contains(2)
    .get('label[for=option0]').contains('Beyonce')
    .get('#option0').should('have.value', 'Beyonce').click()
    .get('label[for=option1]').contains('Taylor Swift')
    .get('#option1').should('have.value', 'Taylor Swift')
    .get('label[for=option2]').contains('Adele')
    .get('#option2').should('have.value', 'Adele')
    .get('label[for=option3]').contains('Madonna')
    .get('#option3').should('have.value', 'Madonna')
    .get('.submit-answer-btn').contains('Lock in?').click().contains('Locked In')
    .get('.submit-answer-btn').should('be.disabled')
    cy.wait(20000)

    .get('.correct-answer-holder').contains('h2', 'The Correct Answer Is:')
    .get('.correct-answer-holder').contains('h3', 'Madonna')
    .get('.correct-player-display').contains('h2', 'Who got It Right?')
    .get('.correct-player-display').contains('ul', 'No one got it right!')
    cy.wait(5000)

    //test end of game display and url
    
  })
})