import { knex } from 'knex';
import { development, prouction, test } from './Enviroment';

const getEnv = () => {
  switch (process.env.NODE_ENV) {
    case 'prouction':
      return prouction;
      
    case 'test':
      return test;

    default:
      return development;
  }
};

export const Knex = knex(getEnv());