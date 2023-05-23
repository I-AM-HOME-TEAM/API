const {Sequelize} = require("sequelize");

const sequelize = new Sequelize({
    dialect: process.env.DATABASE_PROVIDER,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected successfully");
        await sequelize.sync();
    }catch (error){
        console.error("Unable to connect to the database", error)
    }
})();

module.exports = sequelize;