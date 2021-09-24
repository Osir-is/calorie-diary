const dbConnection = require ("../Config/connection")
const { meal, user, calories} = require ("../models")

const caloriesSeeds = require ("./caloriesSeeds.json")
const mealSeeds = require ("./mealSeeds.json")
const userSeeds = require ("./userSeeds.json")




//connect database with server
const seedDatabase = async () => {
    await dbConnection.sync({force:true});

    console.log("DB flashed")

    await user.bulkCreate(userSeeds, {
    individualHooks: true,
});
console.log("UserSeeds")
    await user.bulkCreate(mealSeeds, {
    individualHooks: true,
});
console.log("mealSeeds")
    await user.bulkCreate(caloriesSeeds, {
    individualHooks: true,
});
console.log("caloriesSeeds")
    process.exit(0);
};

seedDatabase()