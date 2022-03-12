const { User } = require('../models');

const userdata = [
    {
        "username": "Carson",
        "password": "password123"

    },
    {
        "username": "Kaiti",
        "password": "password1234"
    },
    {
        "username": "Colby",
        "password": "password12345"
    }
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;
