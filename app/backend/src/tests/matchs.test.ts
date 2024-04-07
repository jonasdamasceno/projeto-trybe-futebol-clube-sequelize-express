import { App } from '../app';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeMatches from '../database/models/MatchesModel';
import {
  matches,
  matchesFinished,
  matchesInProgres,
} from './mocks/matchs.mock';
chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Testes rota /matches', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('testa o retorno do metodo get para todos os times', async function () {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);
    const response = await chai.request(app).get('/matches');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(matches);
  });

  it('testa o retorno dos times para o filtro inProgress=true', async function () {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchesInProgres as any);
    const response = await chai
      .request(app)
      .get('/matches')
      .query({ inProgress: 'true' });
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(matchesInProgres);
  });

  it('testa o retorno dos times para o filtro inProgress=false', async function () {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matchesFinished as any);
    const response = await chai
      .request(app)
      .get('/matches')
      .query({ inProgress: 'false' });
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(matchesFinished);
  });
});
