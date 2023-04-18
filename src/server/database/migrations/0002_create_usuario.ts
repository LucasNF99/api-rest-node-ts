
import { Knex } from 'knex';
import { ETableNames } from '../ETablesNames';

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.USER, table => {
    table.bigIncrements('id').primary().index();
    table.string('nome').index().notNullable().checkLength('>', 3);
    table.string('senha').notNullable().checkLength('>', 6);
    table.string('email').index().unique().notNullable().checkLength('>', 7);

    table.comment('Table used for storage a user data to our sitem.');
  }).then(() => {
    console.log(`# Create table ${ETableNames.USER}`);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.USER).then(() => {
    console.log(`# Delete table ${ETableNames.USER}`);
  });
}

