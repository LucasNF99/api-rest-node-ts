import { knex } from 'knex';
import 'dotenv/config';
import pg from 'pg';
import { development, prouction, test } from './Environment';

if(process.env.NODE_ENV === 'production') {
  pg.types.setTypeParser(20, 'text', parseInt);
}

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