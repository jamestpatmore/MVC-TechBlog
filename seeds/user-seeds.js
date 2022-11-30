const  User  = require('../models/user');

const userData = [{
        username: 'John',
        password: 'password123',

    },
    {
        username: 'James',
        password: 'james123',
    },
    {
        username: 'Billy',
        password: 'billy123',
    }
];

const seedUsers = () => User.bulkCreate(userData,{
    individualHooks: true
});

module.exports = seedUsers;