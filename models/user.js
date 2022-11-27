const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt')
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPass) {
        return bcrypt.compareSync(loginPass, this.password)
    }
}

User.init(
    {
        // define an id column
        id: {
            // use the special Sequelize DataTypes object provide what type of data it is 
            type: DataTypes.INTEGER,
            // equivalent of SQL "NOT NULL"
            allowNull: false,
            // instruct that this is the Primary Key
            primaryKey: true,
            // turn on auto increment
            autoIncrement: true
        },
        // define a username column
        username: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true
        },
        // define a password column 
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this means the password must be at least four characters long
                len: [8]
            }
        }
      },
    {
        hooks: {
            beforeCreate: async (newUserData) => {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }


)

module.exports = User;