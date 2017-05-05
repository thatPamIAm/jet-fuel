
process.env.NODE_ENV = 'test';

const chai     = require('chai')
const should   = chai.should()
const chaiHttp = require('chai-http')
const server   = require('../server')

const configuration = require('../knexfile')['test']
const database      = require('knex')(configuration)
chai.use(chaiHttp)

describe('server side testing', () => {
  before((done) => {
    database.migrate.latest()
    .then(() => {
      database.seed.run()
    })
    .then(() => {
      done()
    })
  })

  afterEach((done) => {
    database.seed.run()
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















































    describe('POST /api/v1/folders', () => {
      it('should allow me to create a new folder', (done) => {
        chai.request(server)
        .post('/api/v1/folders')
        .send({
          folder_name: 'created folder'
        }, 'id')
        .end((error, response) => {
          const { body } = response
          const object   = response.body[2]
          response.should.have.status(201)
          body.should.be.a('array')
          body.length.should.equal(3)
          object.should.have.property('folder_name')
          object.folder_name.should.equal('created folder')
          object.should.have.property('id')
          object.should.have.property('created_at')
          object.should.have.property('updated_at')
          done()
        })
      })
      it('shouldn\'t allow me to post with bunk data', (done) => {
        chai.request(server)
        .post('/api/v1/foldes')
        .send({
          whack_data: "whatever"
        })
        .end((error, response) => {
          response.should.have.status(404)
          done()
        })
      })
    })

    describe('GET /api/v1/urls', () => {
      it('should allow me to fetch those URLS', (done) => {
        chai.request(server)
        .get('/api/v1/urls')
        .end((error, response) => {
          const { body } = response
          const object   = response.body[0]
          response.should.have.status(200)
          body.length.should.equal(4)
          response.should.be.json
          body.should.be.a('array')
          object.should.have.property('id')
          object.should.have.property('url_name')
          object.url_name.should.equal(' testing wbesites')
          object.should.have.property('long_url')
          object.long_url.should.equal('http://coolwebsite.com')
          object.should.have.property('visit_count')
          object.visit_count.should.equal(2)
          object.should.have.property('folder_id')
          done()
        })
      })

      it('should return 404 for a non existent route', (done) => {
        chai.request(server)
        .get('/api/v1/urlsz/work')
        .end((error, response) => {
          response.should.have.status(404)
          done()
        })
      })
    })

    describe('POST /api/v1/urls', () => {
      it('should post URL ', function(done){
        chai.request(server)
        .post(`/api/v1/urls/`)
        .send({ long_url: 'www.turing.io' })
        .end(function (err, res) {
          res.should.have.status(201)
          console.log(res.body)
          const { body } = res
          res.should.be.json
          body.should.be.a('object')
          body.should.have.property('url_name')
          body.should.have.property('folder_id')
          body.should.have.property('long_url')
          body.should.have.property('id')
          body.should.have.property('visit_count')
          body.should.have.property('created_at')
          body.should.have.property('updated_at')
          done()
        }).timeout(20000)
      })
    })

    describe('GET /:id REDIRECT', () => {
      it.only('should redirect given the shorturl id', (done) => {
        chai.request(server)
        .get('/1')
        .end((err, res) => {
          res.status.should.be(200)
          done()
        })
      }).timeout(3333333)
    })
  })
})
  
