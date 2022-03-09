import { Sequelize } from 'sequelize';

const DataBase = {
  connection: null,
  get: () => {
    if (!DataBase.connection) {
       const db = new Sequelize(
        process.env.MYSQL_DB,
        process.env.MYSQL_USER,
        process.env.MYSQL_PASSWORD,
        {
          dialect: 'mariadb',
          host: process.env.MYSQL_HOST,
          logging: false,
        },
      );


      DataBase.connection=db;
    }
    return DataBase.connection;
  },
};

export default DataBase;
