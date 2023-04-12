import { ETableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { IPessoa } from '../../models';

export const getAll = async (page: number, limit: number, filter: string): Promise<IPessoa[] | Error> => {
  try {

    const result = await Knex(ETableNames.PERSON)
      .select('*')
      .where('nomeCompleto', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return result;
  } catch (err) {

    console.log(err);
    return Error('Lista de pessoas não encontrada.');

  }
};