import Sequelize from 'sequelize';
import connection from '../config/db.js';

const Agendameto = connection.define(
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

        datetime: {
            type: Sequelize.STRING,
            allowNull: false
        }

    }
);

export default Agendameto