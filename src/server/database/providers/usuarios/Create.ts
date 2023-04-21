import { PasswordCrypto } from '../../../shared/services';
import { ETableNames } from '../../ETablesNames';
import { Knex } from '../../knex';
import { IUsuario } from '../../models';

export const create = async (
  usuario: Omit<IUsuario, 'id'>
): Promise<number | Error> => {
  try {
    const hashedPassword = await PasswordCrypto.hashPassword(usuario.senha);

    const [result] = await Knex(ETableNames.USER)
      .insert({ ...usuario, senha: hashedPassword })
      .returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Erro ao cadastrar um usuario.');
  } catch (err) {
    console.log(err);
    return Error('Erro ao cadastrar um usuario.');
  }
};
