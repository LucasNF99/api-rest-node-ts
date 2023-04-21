import { StatusCodes } from 'http-status-codes';
import { testServer } from './jest.setup';

describe('User SignUp and SignIn', () => {

  beforeAll(async () => {
    await testServer
      .post('/cadastrar')
      .send({
        nome: 'teste',
        email: 'teste@gmail.com',
        senha: '1234556767',
      });
  });

  it('should create a user successfuly', async () => {
    const createUser = await testServer.post('/cadastrar').send({
      nome: 'José de almeida',
      email: 'Jose1@gmail.com',
      senha: '12345678'
    });

    expect(createUser.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof createUser.body).toEqual('number');
  });

  it('should return a error trying to create user with invalid passowrd', async () => {
    const createUser = await testServer.post('/cadastrar').send({
      nome: 'José de almeida',
      email: 'Jose2@gmail.com',
      // senha: '1234',
    });

    expect(createUser.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(createUser.body).toHaveProperty('errors.body.senha');
  });

  it('should return a error trying to create user with invalid email', async () => {
    const createUser = await testServer.post('/cadastrar').send({
      nome: 'José de almeida',
      // email: 'Jose1mailom',
      senha: '1234wwwdwd',
    });

    expect(createUser.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(createUser.body).toHaveProperty('errors.body.email');
  });

  

  it('should signIn successfuly', async () => {
    const signIn = await testServer.post('/entrar').send({
      email: 'teste@gmail.com',
      senha: '1234556767',
    });

    expect(signIn.statusCode).toEqual(StatusCodes.OK);
    expect(signIn.body).toHaveProperty('accessToken');
  });

  it('should return a error trying signIn withi a invalid passowrd', async () => {
    const signIn = await testServer.post('/entrar').send({
      email: 'teste@gmail.com',
      senha: '',
    });

    expect(signIn.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(signIn.body).toHaveProperty('errors.body.senha');
  });

  it('should return a error trying signIn withi a invalid email', async () => {
    const signIn = await testServer.post('/entrar').send({
      email: 'tesgmail.com',
      senha: '123445654',
    });

    expect(signIn.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(signIn.body).toHaveProperty('errors.body.email');
  });
});
