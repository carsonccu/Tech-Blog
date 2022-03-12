const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
require('dotenv').config();

const sequelize = require('./config/connection');
// Import the custom helper methods
const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;


// Set up sessions with cookies
const sess = {
    secret: process.env.SESSION_STORAGE,
    cookie: {
        // Stored in milliseconds (86400 === 1 day)
        maxAge: 86400,
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers }); //this tells it to go to layout/main - automatically

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});