import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';


dotenv.config();


const db: string = process.env.DB as string;
const db_usr: string = process.env.DB_USERNAME as string;
const db_pw: string = process.env.DB_PASSWORD as string;


const sequelize = new Sequelize( db, db_usr, db_pw, {
    dialect: process.env.DB_DIALECT as Dialect,
    storage: process.env.DB_NAME as Dialect,
    logging: false
}); 


export default sequelize;