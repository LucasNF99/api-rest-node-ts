import { ETableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { IPessoa } from '../../models';

export const updateById = async (id: number, pessoa: Omit<IPessoa, 'id'>): Promise<void | Error> => {
  try {

    const [{ count }] = await Knex(ETableNames.CITY)
      .where('id', '=', pessoa.cidadeId)
      .count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error('A cidade usada no cadastro não foi encontrada.');
    }


    const result = await Knex(ETableNames.PERSON).update(pessoa).where('id', '=', id);

    if(result > 0) return;

    return new Error('Erro ao atualizar uma pessoa.');

  } catch (err) {

    console.log(err);
    return Error('Erro ao atualizar uma pessoa.');

  }
};