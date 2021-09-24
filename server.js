const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const fileUpload = require('express-fileupload');
const routes = require('./routes');
const sequelize = require('./config/connection');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

// handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// turn on routes
app.use(routes);
app.use('/dashboard', require('./routes/dashboard'));
app.use('/', require('./routes/index'));

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});

//connect server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('I am running on port', PORT);
});