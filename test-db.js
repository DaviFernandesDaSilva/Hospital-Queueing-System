const { Sequelize } = require('sequelize');

// Ajuste os dados de conexão conforme seu banco
const sequelize = new Sequelize('hospital_db', 'postgres', 'davi123', {
    host: 'localhost',
    dialect: 'postgres',
    logging: console.log // imprime todas as queries no console
});

async function testConnection() {
    try {
        console.log("Tentando conectar ao banco...");
        await sequelize.authenticate();
        console.log("Conexão com o banco realizada com sucesso!");
    } catch (error) {
        console.error("Erro ao conectar com o banco:", error);
    } finally {
        await sequelize.close();
        console.log("Conexão encerrada.");
    }
}

testConnection();

