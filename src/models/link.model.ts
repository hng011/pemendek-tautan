import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';
// import {v4 as uuidv4, UUIDTypes} from 'uuid';
import generateID  from '../utils/id.generator';
import dotenv from 'dotenv'; 


dotenv.config();


export interface LinkAttr {
    id: string;
    url: string;
    createdAt?: Date;
    updatedAt?: Date;
}


// ID is optional when creating
interface LinkCreationAttr extends Optional<LinkAttr, 'id'> {}


class Link extends Model<LinkAttr, LinkCreationAttr> implements LinkAttr {
    public id!: string;
    public url!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


Link.init(
    {
        id: {
            type: DataTypes.STRING,
            defaultValue: generateID,
            primaryKey: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull:false,
        }
    },
    {
        sequelize,
        tableName: process.env.DB_TABLE0_NAME,
    }
);


export default Link;