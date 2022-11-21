import Sequelize from 'sequelize';
import connection from '../config/db.js';
import bcrypt from 'bcrypt';

const User = connection.define(
    'user',
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
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
            unique: true
        },
        nascimento: {
            type: Sequelize.STRING,
            allowNull: false
        },
        telefone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        cep: {
            type: Sequelize.STRING,
            allowNull: false
        },
        numcasa: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        confirmepassword: {
            type: Sequelize.STRING,
            allowNull: false
        },
        admin: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    },
    {
        hooks: {
            beforeCreate: async(user) => {
                if(user.password){
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            },
            beforeUpdate: async(user) => {
                if(user.password){
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            }
        }
    }
);

export default User;