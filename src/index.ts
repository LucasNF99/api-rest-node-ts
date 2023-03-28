import { server } from './server/server';

server.listen(process.env.PORT, ()=> {
  console.log(`Server rodando na porta: ${process.env.PORT}`);
});