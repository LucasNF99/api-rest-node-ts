import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - create', () => {

  it('should create city successfuly', async () => {

    const res1 = await testServer
      .post('/cidades')
      .send({nome: 'Caxias do sul'});

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');

  });

  it('should return an error when name is lass than three caracteres', async () => {

    const res = await testServer
      .post('/cidades')
      .send({ nome: 'Ca' });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body.nome');
    
  });

});