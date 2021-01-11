const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const { makeMockModels } = require('sequelize-test-helpers');
const jwt = require('jsonwebtoken');
const { assert, expect } = require("chai");

require('dotenv').config();

chai.should();
chai.use(chaiHttp);


/** set up mocks for user model */
const User = { authenticate: sinon.stub(), create: sinon.stub() };
const mockModels = makeMockModels({ User }, './models');

const auth = proxyquire('../routes/auth', {
  '../models/User': mockModels.User
});

const routes = proxyquire('../routes', {
  './auth': auth
})

const app = proxyquire('../app.js', {
  './routes': routes
});

describe("POST /api/auth/login", () => {

  context("logging in with valid credentials", () => {

    let data;

    before(() => {
      data = { username: 'testuser', password: 'testpass' };
      User.authenticate.resolves({ username: data.username });
    });

    it("should return 200 status code", done => {
      chai
        .request(app)
        .post(`/api/auth/login`)
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('message', 'Successfully logged in.');
          done();
        });
    });

    it("should add a cookie with a valid JWT", done => {
      chai
        .request(app)
        .post(`/api/auth/login`)
        .send(data)
        .end((err, res) => {
          expect(res).to.have.cookie('token', jwt.sign({
            username: data.username
          }, process.env.SECRET_KEY));
          done();
        });
    });
  });

  context("logging in with invalid credentials", () => {

    let data;

    before(() => {
      data = { username: 'testuser', password: 'testpass' };
      const err = new Error("Invalid credentials");
      User.authenticate.throws(err);
    });

    it("should return 401 status code", done => {
      chai
        .request(app)
        .post(`/api/auth/login`)
        .send(data)
        .end((err, res) => {
          console.log(res.body);
          expect(res.status).to.equal(401);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.have.property('message', 'Invalid credentials');
          done();
        });
    });

    it("should not add a cookie", done => {
      chai
        .request(app)
        .post(`/api/auth/login`)
        .send(data)
        .end((err, res) => {
          expect(res).not.to.have.cookie('token');
          done();
        });
    });
  });
});


describe("POST /auth/register", () => {

  context("register with valid data", () => {

    let data;

    before(() => {
      data = { username: 'testuser', password: 'testpass', email: 'test@test.com' };
      User.create.resolves({ username: data.username });
    });

    it("should return 201 status code", done => {
      chai
        .request(app)
        .post(`/api/auth/register`)
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('message', 'New account successfully created.');
          done();
        });
    });

    it("should add a cookie with a valid JWT", done => {
      chai
        .request(app)
        .post(`/api/auth/register`)
        .send(data)
        .end((err, res) => {
          expect(res).to.have.cookie('token', jwt.sign({
            username: data.username
          }, process.env.SECRET_KEY));
          done();
        });
    });
  });

  context("attempting to create account with invalid data", () => {

    const data = {};

    it("should return 400 status code", done => {
      chai
        .request(app)
        .post(`/api/auth/register`)
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('error');
          done();
        });
    });

    it("should not add a cookie", done => {
      chai
        .request(app)
        .post(`/api/auth/register`)
        .send(data)
        .end((err, res) => {
          expect(res).not.to.have.cookie('token');
          done();
        });
    });
  });

  context("attempting to create an account with existing credentials", () => {

    let data;
    before(() => {
      data = { username: 'valid_username', password: 'validpass', email: 'test@test.com' };
      User.create.throws(new Error("Duplicate email address"));
    });

    it("should return 400 status code", done => {
      chai
        .request(app)
        .post(`/api/auth/register`)
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.have.property('message', 'Duplicate email address');
          done();
        });
    });

    it("should not add a cookie", done => {
      chai
        .request(app)
        .post(`/api/auth/register`)
        .send(data)
        .end((err, res) => {
          expect(res).not.to.have.cookie('token');
          done();
        });
    });

  });
});