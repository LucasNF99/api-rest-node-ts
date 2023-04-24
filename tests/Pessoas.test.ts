import { StatusCodes } from 'http-status-codes';
import { testServer } from './jest.setup';

describe('Person testing file', () => {
  let accessToken: string;
  beforeAll(async () => {
    const email = 'create-person@gmail.com';

    await testServer.post('/cadastrar').send({
      nome: 'teste',
      email,
      senha: '123434435453',
    });

    const signInRes = await testServer.post('/entrar').send({
      email,
      senha: '123434435453',
    });

    accessToken = signInRes.body.accessToken;
  });

  let cidadeId: number | undefined = undefined;

  beforeAll(async ()=> {
    const resCidade = await testServer
      .post('/cidades')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nome: 'teste' });
    cidadeId = resCidade.body;
  });

  it('should create a person successfuly', async () => {
    const createPerson = await testServer
      .post('/pessoas')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: 'José de almeida',
        email: 'Jose1@gmail.com',
        cidadeId,
      });

    expect(createPerson.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof createPerson.body).toEqual('number');

  });

  it('should return an error when name is lass than three caracteres', async () => {

    const res = await testServer
      .post('/pessoas')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: 'Jo',
        email: 'Jose2@gmail.com',
        cidadeId,
      });

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty('errors.body');
    
  });

  it('should delete a person successfuly', async () => {
    const createPerson = await testServer.post('/pessoas')
      .set({Authorization: `Bearer ${accessToken}`})
      .send({
        nomeCompleto: 'José de almeida',
        email: 'Jose3@gmail.com',
        cidadeId
      });

    expect(createPerson.statusCode).toEqual(StatusCodes.CREATED);


    const deltedPerson = await testServer.delete(`/pessoas/${createPerson.body}`)
      .set({Authorization: `Bearer ${accessToken}`})
      .send();

    expect(deltedPerson.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('should return an error when trying to delete a person', async () => {
    const res = await testServer
      .delete('/pessoas/999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  });

  it('should get a list of all persons', async () => {
    const createPerson = await testServer
      .post('/pessoas')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: 'José de almeida',
        email: 'Jose4@gmail.com',
        cidadeId,
      });
    expect(createPerson.statusCode).toEqual(StatusCodes.CREATED);

    const getAllCities = await testServer
      .get('/pessoas')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(Number(getAllCities.header['x-total-count'])).toBeGreaterThan(0);
    expect(getAllCities.statusCode).toEqual(StatusCodes.OK);
    expect(getAllCities.body.length).toBeGreaterThan(0);
  });

  it('should get a person by id successfuly', async () => {
    const createPerson = await testServer
      .post('/pessoas')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: 'José de almeida',
        email: 'Jose5@gmail.com',
        cidadeId,
      });
    expect(createPerson.statusCode).toEqual(StatusCodes.CREATED);

    const getCity = await testServer
      .get(`/pessoas/${createPerson.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(getCity.statusCode).toEqual(StatusCodes.OK);
  });

  it('should return an error when trying to get a person by id', async () => {
    const res = await testServer
      .get('/pessoas/999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  });

  it('should update a person by id successfuly', async () => {
    const createPerson = await testServer
      .post('/pessoas')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({
        nomeCompleto: 'José de almeida',
        email: 'Jose6@gmail.com',
        cidadeId,
      });
    expect(createPerson.statusCode).toEqual(StatusCodes.CREATED);

    const updateCity = await testServer
      .put(`/pessoas/${createPerson.body}`)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nomeCompleto: 'Caixa', email: 'Jose6@gmail.com', cidadeId });

    expect(updateCity.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('should return an error when trying to update a person by id', async () => {
    const res = await testServer
      .put('/pessoas/999')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send({ nomeCompleto: 'caixas', cidadeId, email: 'test@gmail.com' });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty('errors.default');
  });

});