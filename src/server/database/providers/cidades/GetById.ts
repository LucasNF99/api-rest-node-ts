import { ETableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { ICidade } from '../../models';

export const getById = async (id: number): Promise<ICidade | Error> => {
  try {

    const result = await Knex(ETableNames.CITY).select('*').where('id', '=', id).first();

    if(result) return result;

    return new Error('Cidade não encontrada.');

  } catch (err) {

    console.log(err);
    return Error('Cidade não encontrada.');

  }
};