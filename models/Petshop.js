import Sequelize from 'sequelize';
import connection from '../config/db.js';

const Petshop = connection.define(
    'petshop',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        nomepetshop: {
            type: Sequelize.STRING(500),
            allowNull: false
        },

        proprietario: {
            type: Sequelize.STRING,
            allowNull: false
        },

        cnpj: {
            type: Sequelize.STRING,
            allowNull: false
        },

        email: {
            type: Sequelize.STRING,
            allowNull: false
        },

        telefone: {
            type: Sequelize.STRING,
            allowNull: false
        },

        endereco: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }
);

export default Petshop;