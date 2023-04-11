import { ETableNames } from '../../ETablesNames';
import { Knex } from '../../knex';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {

    const result = await Knex(ETableNames.CITY).where('id', '=', id).del();

    if(result > 0) return;

    return new Error('Erro ao apagar uma cidade.');

  } catch (err) {

    console.log(err);
    return Error('Erro ao apagar uma cidade.');

  }
};