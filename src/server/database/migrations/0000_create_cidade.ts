
import { Knex } from 'knex';
import { ETableNames } from '../ETablesNames';

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.CITY, table => {
    table.bigIncrements('id').primary().index();
    table.string('nome', 150).checkLength('<=', 150).index().notNullable();

    table.comment('Table used for storage cities to our sitem.');
  }).then(() => {
    console.log(`# Create table ${ETableNames.CITY}`);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.CITY).then(() => {
    console.log(`# Delete table ${ETableNames.CITY}`);
  });
}

