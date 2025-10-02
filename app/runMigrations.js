const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');
const path = require('path');

// Configura conexão
const sequelize = new Sequelize('hospital_db', 'postgres', 'davi123', {
  host: 'localhost',
  dialect: 'postgres',
  logging: console.log
});

// Configura Umzug
const umzug = new Umzug({
  migrations: { glob: path.join(__dirname, 'migrations/*.js') },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});

(async () => {
  await umzug.up();
  console.log('Migrations executadas com sucesso!');
  process.exit();
})();
