import { App } from '../app';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import SequelizeTeam from '../database/models/TeamsModel';
import { team, teams } from './mocks/teams.mock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Este teste verifica se a rota /teams', function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('testa o retorno correto de todos os times armazenados no banco de dados.', async function () {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);
    const response = await chai.request(app).get('/teams');
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(teams);
  });

  it('testa o retorno se é possivel filtrar pelo id', async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(team as any);
    const response = await chai.request(app).get('/teams/2');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(team);
  });

  it('Verifica se não conseguir encontrar um time pelo id', async function () {
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
    const response = await chai.request(app).get('/teams/3');
    expect(response.status).to.be.equal(404);
    expect(response.body).to.deep.equal({ message: 'Team not found' });
  });
});
