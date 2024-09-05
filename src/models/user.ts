import InitPostgres from "../db/init.postgres";
import {DataTypes} from "sequelize";

const User = InitPostgres.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    phone: {
        type: DataTypes.NUMBER,
        allowNull: true,
        unique: true
    },
    confirmationCodeEmail: {
        type: DataTypes.INTEGER,
    },
    confirmationCodePhone: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    statusSocial: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "POVERTY"
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "USER"
    },
    isActiveEmail: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    isActivePhone: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
})

export default {
    User
}