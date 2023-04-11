import { ETableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { ICidade } from '../../models';

export const updateById = async (id: number, cidade: Omit<ICidade, 'id'>): Promise<void | Error> => {
  try {

    const result = await Knex(ETableNames.CITY).update(cidade).where('id', '=', id);

    if(result > 0) return;

    return new Error('Erro ao atualizar uma cidade.');

  } catch (err) {

    console.log(err);
    return Error('Erro ao atualizar uma cidade.');

  }
};