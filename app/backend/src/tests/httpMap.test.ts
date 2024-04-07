import * as sinon from 'sinon';
import * as chai from 'chai';
const { expect } = chai;
import HTTPMap from '../utils/httpStatusMap';

describe('HTTPMap Tests', function () {
  it('testa o retorno de cada função do HTTPMap', function () {
    const HTTP_SUCCESS = HTTPMap('SUCCESSFUL');
    const HTTP_INVALID_DATA = HTTPMap('INVALID_DATA');
    const HTTP_NOT_FOUND = HTTPMap('NOT_FOUND');
    const HTTP_CONFLICT = HTTPMap('CONFLICT');
    const HTTP_UNAUTHORIZED = HTTPMap('UNAUTHORIZED');
    const HTTP_DEFAULT = HTTPMap('teste');

    expect(HTTP_SUCCESS).to.equal(200);
    expect(HTTP_INVALID_DATA).to.equal(400);
    expect(HTTP_NOT_FOUND).to.equal(404);
    expect(HTTP_CONFLICT).to.equal(409);
    expect(HTTP_UNAUTHORIZED).to.equal(401);
    expect(HTTP_DEFAULT).to.equal(500);
  });
});
