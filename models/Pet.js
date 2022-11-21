import Sequelize from 'sequelize';
import connection from '../config/db.js';

const Pet = connection.define(
    'pet',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        nome: {
            type: Sequelize.STRING,
            allowNull: false
        },

        especie: {
            type: Sequelize.STRING,
            allowNull: false
        },

        raca: {
            type: Sequelize.STRING,
            allowNull: false
        },
    
        cor: {
            type: Sequelize.STRING,
            allowNull: false
        },

        sexo: {
            type: Sequelize.STRING,
            allowNull: false
        },

        peso: {
            type: Sequelize.STRING,
            allowNull: false
        },

        porte: {
            type: Sequelize.STRING,
            allowNull: false
        },

        nascimento: {
            type: Sequelize.STRING,
            allowNull: false
        },

        castrado: {
            type: Sequelize.STRING,
            allowNull: false
        },

        alergia: {
            type: Sequelize.STRING,
            allowNull: false
        },

        perfume: {
            type: Sequelize.STRING,
            allowNull: false
        },

        agressivo: {
            type: Sequelize.STRING,
            allowNull: false
        },

        observacao: {
            type: Sequelize.STRING,
            allowNull: false
        },
        imagempet: {
            type: Sequelize.BLOB('long'),
            allowNull: false
        }
    }
);

export default Pet; 