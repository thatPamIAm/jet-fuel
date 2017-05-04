// process.env.NODE_ENV = 'test';

const chai     = require('chai')
const should   = chai.should()
const chaiHttp = require('chai-http')
const server   = require('../server')


const configuration = require('./knexfile')['test']
const database      = require('knex')(configuration)


chai.use(chaiHttp)


desribe('server side testing', () => {
  before()

 // one migration : latest
 // seed
  afterEach()
  //  seed

  describe('Client Routes', () => {
    it('should return HTML', (done) => {
      chai.request(server)
      .get('/')
      .end((error, response) => {
        response.should.have.status(200)
        response.should.be.html
        response.res.text.should.include('JETFUEL!!')
        done()
      })
    })

    it('should return 404 for a non existent route', (done) => {
      chai.request(server)
      .get('/please/dont/work')
      .end((error, response) => {
        response.should.have.status(404)
        done()
      })
    })
  })

  describe('API Routes', () => {


  })
})


