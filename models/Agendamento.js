import Sequelize from 'sequelize';
import connection from '../config/db.js';

const Agendamento = connection.define(
    'agendamento',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },

        idservice: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'services',
                key: 'id'
            }
        },

        // iduser: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        //     references: {
        //         model: 'users',
        //         key: 'id'
        //     }
        // },

        nomeagendamento: {
            type: Sequelize.STRING,
            allowNull: false
        },

        nomepet: {
            type: Sequelize.STRING,
            allowNull: false
        },

        date: {
            type: Sequelize.STRING,
            allowNull: false
        },

        time: {
            type: Sequelize.STRING,
            allowNull: false
        }

    }
);

export default Agendamento