import { Router } from 'express';
import { CidadesController } from './../controllers';

const router = Router();

router.get('/', (_, res) => {
  return res.send('Olá mundo.');
});

router.post('/cidades', CidadesController.create);

export { router };