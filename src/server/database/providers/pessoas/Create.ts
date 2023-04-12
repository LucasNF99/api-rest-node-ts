import { ETableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { IPessoa } from '../../models';

export const create = async (pessoa: Omit<IPessoa, 'id'>): Promise<number | Error> => {
  try {

    const [{ count }] = await Knex(ETableNames.CITY)
      .where('id', '=', pessoa.cidadeId)
      .count<[{ count: number }]>('* as count');

    if(count === 0) {
      return new Error('A cidade usada no cadastro não foi encontrada.');
    }

    const [result] = await Knex(ETableNames.PERSON).insert(pessoa).returning('id');

    if(typeof result === 'object') {
      return result.id;
    } else if(typeof result === 'number') {
      return result;
    }

    return new Error('Erro ao cadastrar uma pessoa.');

  } catch (err) {

    console.log(err);
    return Error('Erro ao cadastrar uma pessoa.');

  }
};