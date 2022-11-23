import Sequelize from 'sequelize';
import connection from '../config/db.js';

const Service = connection.define(
    'service',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        // iduser: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'users',
        //         key: 'id'
        //     }
        // },

        // idpet: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'pets',
        //         key: 'id'
        //     }
        // },

        nomeservice: {
            type: Sequelize.STRING,
            allowNull: false
        },

        descricao: {
            type: Sequelize.STRING,
            allowNull: false
        },

        valor: {
            type: Sequelize.DECIMAL(8,2),
            allowNull: false
        },

        imagemservice: {
            type: Sequelize.BLOB('long'),
            allowNull: false
        }
    }
);

export default Service