import InitPostgres from './init.postgres';

export async function connectPostgres() {
  try {
    await InitPostgres.authenticate();
    await InitPostgres.sync();
    return 'РСУБД Postgres успешно подключена!';
  } catch (e) {
    throw new Error(`Ошибка подклюения РСУБД Postgres: ${e}`);
  }
}
