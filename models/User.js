const orm = require('../config/orm');


const createUsers = (userId, email, name) => {
    orm.Users.create({ sessionId: userId, Email: email, userName: name });
};

const createBreakfast = (breakfast, breakfastcl) => {
    orm.Stress.create({ usersId: id, breakfast: breakfast, breakfastcl: breakfastcl });
};

module.exports = {
    createUsers,
    createBreakfast,
    createLunch,
    createDinner,
    createSnacks
};