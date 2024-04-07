import { App } from '../app';
import * as sinon from 'sinon';
import * as chai from 'chai';
import {
  invalidPassword,
  invalidEmail,
  userValid,
  validBodyLogin,
} from './mocks/users.mock';
import Validations from '../middlewares/validations';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeUsers from '../database/models/UsersModel';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes das rotas /login e /login/role', function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('testa o retornar do erro se não for passado email valido /login', async function () {
    const response = await chai
      .request(app)
      .post('/login')
      .send({ password: 'teste123' });
    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
  });
  it('testa o Retorna do erro se não for passado uma senha valida /login', async function () {
    const response = await chai
      .request(app)
      .post('/login')
      .send({ email: 'admin@admin.com' });
    expect(response.status).to.equal(400);
    expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
  });
  it('testa o retorno de um erro se a senha estiver incorreta /login', async function () {
    const response = await chai
      .request(app)
      .post('/login')
      .send(invalidPassword);
    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('testa o retorno de um erro se não existir o email cadastrado /login', async function () {
    const response = await chai
      .request(app)
      .post('/login')
      .send(invalidEmail);
    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('testa se a api retorna um token caso seja possivel fazer o login /login', async function () {
    sinon.stub(SequelizeUsers, 'findOne').resolves(userValid as any);
    sinon.stub(jwt, 'sign').returns();
    sinon.stub(Validations, 'validateLoginFields').returns();

    const { status } = await chai
      .request(app)
      .post('/login')
      .send(validBodyLogin);
    expect(status).to.equal(200);
  });

  it('testa se retorna um erro caso o email seja de formato invalido /login', async function () {
    const response = await chai
      .request(app)
      .post('/login')
      .send({ email: 'teste.com', password: '1234567' });
    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('testa o Retorno do erro caso não seja passado um token para /login/role', async function () {
    const response = await chai.request(app).get('/login/role').send();
    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({ message: 'Token not found' });
  });
});
