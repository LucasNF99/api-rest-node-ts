import { ETableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { IPessoa } from '../../models';

export const getById = async (id: number): Promise<IPessoa | Error> => {
  try {

    const result = await Knex(ETableNames.PERSON).select('*').where('id', '=', id).first();

    if(result) return result;

    return new Error('Pessoa não encontrada.');

  } catch (err) {

    console.log(err);
    return Error('Pessoa não encontrada.');

  }
};