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
    cy.get('#name').type('creator').should('have.value', 'creator')
    .get('#topic').type('music').should('have.value', 'music')
    .get('#players').clear().type('3').should('have.value', '3')
    .get('#questions').clear().type('2').should('have.value', '2')
    .get('.create-btn').click()
    .url().should('eq', 'http://localhost:3000/Brain-Defrost_FE/game/lobby/1')
    .get('.game-topic').contains('music')
    .get('.question-count').contains('2 Questions')
    .get('.join-url-heading').contains('Share the Link to invite players!')
    .get('.join-url-container').children().should('have.length', 2)
    .get('.join-url').contains('Copy Link')
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
    cy.get('#name').type('creator').should('have.value', 'creator')
    .get('#topic').type('music').should('have.value', 'music')
    .get('#players').clear().type('3').should('have.value', '3')
    .get('#questions').clear().type('2').should('have.value', '2')
    .get('.create-btn').click()
    cy.intercept('POST', 'https://c98a077d-6c2a-4ca9-a867-cf11b6279230.mock.pstmn.io/api/v1/games/1/players',
      {
        statusCode: 201,
        fixture: 'createdPlayer2'
      }).as('createPlayer')
    cy.visit('http://localhost:3000/Brain-Defrost_FE/join/1/?data=%7B"id"%3A1%2C"type"%3A"game"%2C"attributes"%3A%7B"link"%3A"www.example.com"%2C"started"%3Afalse%2C"number_of_questions"%3A8%2C"number_of_players"%3A7%2C"topic"%3A"music"%2C"time_limit"%3A30%7D%2C"relationships"%3A%7B"players"%3A%7B"data"%3A%5B%7B"id"%3A1%2C"type"%3A"player"%2C"attributes"%3A%7B"display_name"%3A"creator"%2C"answers_correct"%3A0%2C"answers_incorrect"%3A0%2C"questions_correct"%3A%5B%5D%7D%7D%5D%7D%2C"questions"%3A%7B"data"%3A%5B%7B"id"%3Anull%2C"type"%3A"question"%2C"attributes"%3A%7B"topic"%3A"Music%20Trivia"%2C"question_text"%3A"Who%20is%20the%20lead%20vocalist%20of%20The%20Beatles%3F"%2C"question_number"%3A1%2C"answer"%3A"John%20Lennon"%2C"options"%3A%5B"Paul%20McCartney"%2C"George%20Harrison"%2C"Ringo%20Starr"%2C"John%20Lennon"%5D%7D%7D%2C%7B"id"%3Anull%2C"type"%3A"question"%2C"attributes"%3A%7B"topic"%3A"Music%20Trivia"%2C"question_text"%3A"Which%20artist%20is%20known%20as%20the%20%27Queen%20of%20Pop%27%3F"%2C"question_number"%3A2%2C"answer"%3A"Madonna"%2C"options"%3A%5B"Beyonce"%2C"Taylor%20Swift"%2C"Adele"%2C"Madonna"%5D%7D%7D%2C%7B"id"%3Anull%2C"type"%3A"question"%2C"attributes"%3A%7B"topic"%3A"Music%20Trivia"%2C"question_text"%3A"What%20instrument%20does%20Elton%20John%20famously%20play%3F"%2C"question_number"%3A3%2C"answer"%3A"Piano"%2C"options"%3A%5B"Guitar"%2C"Drums"%2C"Violin"%2C"Piano"%5D%7D%7D%2C%7B"id"%3Anull%2C"type"%3A"question"%2C"attributes"%3A%7B"topic"%3A"Music%20Trivia"%2C"question_text"%3A"Which%20song%20by%20Michael%20Jackson%20features%20a%20famous%20zombie%20dance%3F"%2C"question_number"%3A4%2C"answer"%3A"Thriller"%2C"options"%3A%5B"Beat%20It"%2C"Billie%20Jean"%2C"Smooth%20Criminal"%2C"Thriller"%5D%7D%7D%2C%7B"id"%3Anull%2C"type"%3A"question"%2C"attributes"%3A%7B"topic"%3A"Music%20Trivia"%2C"question_text"%3A"What%20genre%20of%20music%20did%20Elvis%20Presley%20become%20famous%20for%3F"%2C"question_number"%3A5%2C"answer"%3A"Rock%20n%27%20Roll"%2C"options"%3A%5B"Jazz"%2C"Blues"%2C"Country"%2C"Rock%20n%27%20Roll"%5D%7D%7D%2C%7B"id"%3Anull%2C"type"%3A"question"%2C"attributes"%3A%7B"topic"%3A"Music%20Trivia"%2C"question_text"%3A"Which%20band%20released%20the%20album%20%27Dark%20Side%20of%20the%20Moon%27%3F"%2C"question_number"%3A6%2C"answer"%3A"Pink%20Floyd"%2C"options"%3A%5B"Led%20Zeppelin"%2C"The%20Rolling%20Stones"%2C"The%20Beatles"%2C"Pink%20Floyd"%5D%7D%7D%2C%7B"id"%3Anull%2C"type"%3A"question"%2C"attributes"%3A%7B"topic"%3A"Music%20Trivia"%2C"question_text"%3A"Who%20is%20the%20best-selling%20female%20artist%20of%20all%20time%3F"%2C"question_number"%3A7%2C"answer"%3A"Madonna"%2C"options"%3A%5B"Celine%20Dion"%2C"Whitney%20Houston"%2C"Mariah%20Carey"%2C"Madonna"%5D%7D%7D%2C%7B"id"%3Anull%2C"type"%3A"question"%2C"attributes"%3A%7B"topic"%3A"Music%20Trivia"%2C"question_text"%3A"What%20is%20the%20name%20of%20Rihanna%27s%20debut%20single%3F"%2C"question_number"%3A8%2C"answer"%3A"Pon%20de%20Replay"%2C"options"%3A%5B"Umbrella"%2C"Diamonds"%2C"Love%20on%20the%20Brain"%2C"Pon%20de%20Replay"%5D%7D%7D%5D%7D%7D%7D')
    .get('#display-name-input').type('student1').should('have.value', 'student1')
    .get('#join-game-button').click()
    .url().should('eq', 'http://localhost:3000/Brain-Defrost_FE/game/lobby/1')
    .get('.game-topic').contains('music')
    .get('.question-count').contains('8 Questions')
    .get('.join-url-heading').contains('Share the Link to invite players!')
    .get('.join-url-container').children().should('have.length', 2)
    .get('.join-url').contains('Copy Link')
    .get('.start-game-btn').contains('Start Game!')
    .get('.players-heading').contains('Players')
    .get('.players').contains('p', 'creator')
    .get('.players').contains('p', 'student1')
  })
})