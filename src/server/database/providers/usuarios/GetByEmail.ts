import { ETableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { IUsuario } from '../../models';

export const getById = async (email: string): Promise<IUsuario | Error> => {
  try {
    const result = await Knex(ETableNames.USER)
      .select('*')
      .where('email', '=', email)
      .first();

    if (result) return result;

    return new Error('Usuario não encontrado.');
  } catch (err) {
    console.log(err);
    return Error('Usuario não encontrado.');
  }
};
