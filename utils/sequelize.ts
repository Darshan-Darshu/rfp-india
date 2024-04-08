import { Sequelize } from "sequelize";
import mysql from "mysql2";

const sequelize = new Sequelize({
  host: "you_host",
  username: "root",
  password: "Admin123#",
  database: "testdb",
  dialect: "mysql",
  dialectModule: mysql,
  benchmark: true,
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection has been established successfully",
    );

    await sequelize.sync({ alter: true });
  } catch (err) {
    console.log("Unable to authenticate to the db: ", err);
  }
})();

export default sequelize;
