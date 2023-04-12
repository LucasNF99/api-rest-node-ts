
import { Knex } from 'knex';
import { ETableNames } from '../ETablesNames';

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.PERSON, table => {
    table.bigIncrements('id').primary().index();
    table.string('nomeCompleto').index().notNullable();
    table.string('email').unique().notNullable();
    table.bigInteger('cidadeId')
      .index()
      .notNullable()
      .references('id')
      .inTable(ETableNames.CITY)
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');

    table.comment('Table used for storage a person data to our sitem.');
  }).then(() => {
    console.log(`# Create table ${ETableNames.PERSON}`);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.PERSON).then(() => {
    console.log(`# Delete table ${ETableNames.PERSON}`);
  });
}

