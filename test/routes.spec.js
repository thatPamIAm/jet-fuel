process.env.NODE_ENV = 'test';

const chai     = require('chai')
const should   = chai.should()
const chaiHttp = require('chai-http')
const server   = require('../server')

const configuration = require('../knexfile')['test']
const database      = require('knex')(configuration)

chai.use(chaiHttp)

describe('server side testing', () => {
  beforeEach((done) => {
    database.migrate.latest()
    .then(() => {
      return database.seed.run()
    })
    .then(() => {
      done()
    })

  })

  afterEach((done) => {
    database.migrate.rollback()
    .then(() => {
      done()
    })
  })

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
    describe('GET /api/v1/folders', (request, response) => {
      it('should return all of the folders', (done) => {
        chai.request(server)
        .get('/api/v1/folders')
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('array')
          response.body.length.should.equal(2)
          response.body[0].should.have.property('folder_name')
          response.body[0].folder_name.should.equal('really cool folder')
          response.body[1].should.have.property('folder_name')
          response.body[1].folder_name.should.equal('another chic folder')

          done()
        })
      })
  })

    describe('GET /api/v1/folders/:id', (request, response) => {
      it('should return a single folder by an ID', (done) => {
        chai.request(server)
        .get('/api/v1/folders/1')
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('array')
          response.body.length.should.equal(1)
          response.body[0].should.have.property('folder_name')
          response.body[0].folder_name.should.equal('really cool folder')

          done()
        })
      })
  })

    describe('GET /api/v1/folders/:id/urls', (request, response) => {
      it('should return all the URLs from a single folder', (done) => {
        chai.request(server)
        .get('/api/v1/folders/1/urls')
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('array')
          response.body.length.should.equal(2)
          response.body[0].should.have.property('url_name')
          response.body[0].url_name.should.equal(' testing wbesites')

          done()
        })
      })
  })


})
})
