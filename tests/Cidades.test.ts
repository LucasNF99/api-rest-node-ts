import { StatusCodes } from 'http-status-codes';
import { testServer } from './jest.setup';

describe('Cidades - create', () => {

  it('should create a city successfuly', async () => {

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

  it('should delete a city successfuly', async () => {
    const createCity = await testServer
      .post('/cidades')
      .send({ nome: 'Caxias do sul' });

    expect(createCity.statusCode).toEqual(StatusCodes.CREATED);


    const deltedCity = await testServer.delete(`/cidades/${createCity.body}`).send();

    expect(deltedCity.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('should return an error when trying to delete a city', async () => {
    const res = await testServer.delete('/cidades/999').send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  });

  it('should get a list of all cities', async () => {
    const createCity = await testServer
      .post('/cidades')
      .send({ nome: 'Caixa' });

    expect(createCity.statusCode).toEqual(StatusCodes.CREATED);

    const getAllCities = await testServer
      .get('/cidades')
      .send();

    expect(Number(getAllCities.header['x-total-count'])).toBeGreaterThan(0);
    expect(getAllCities.statusCode).toEqual(StatusCodes.OK);
    expect(getAllCities.body.length).toBeGreaterThan(0);
  });

  it('should get a city by id successfuly', async () => {
    const createCity = await testServer
      .post('/cidades')
      .send({ nome: 'Caxias do sul' });

    expect(createCity.statusCode).toEqual(StatusCodes.CREATED);

    const getCity = await testServer
      .get(`/cidades/${createCity.body}`)
      .send();

    expect(getCity.statusCode).toEqual(StatusCodes.OK);
    expect(getCity.body).toHaveProperty('nome');
  });

  it('should return an error when trying to get a city by id', async () => {
    const res = await testServer.get('/cidades/999').send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  });

  it('should update a city by id successfuly', async () => {
    const createCity = await testServer
      .post('/cidades')
      .send({ nome: 'Caxias do sul' });

    expect(createCity.statusCode).toEqual(StatusCodes.CREATED);

    const updateCity = await testServer
      .put(`/cidades/${createCity.body}`)
      .send({nome: 'Caixa'});

    expect(updateCity.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('should return an error when trying to update a city by id', async () => {
    const res = await testServer.put('/cidades/999').send({nome: 'caixas'});

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  });

});