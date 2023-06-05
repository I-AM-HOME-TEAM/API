const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");
const cors = require("cors")
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require("dotenv").config();


require('./models/user');

const api = require ('./api');

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

const app = express();
app.use(session({ secret: process.env.SESSION_SECRET }));
const passport = require("passport");
require("./auth/passport");

app.use(passport.initialize());
app.use(passport.session());

const whitelist = ["http://localhost:8080"]
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions))

const swaggerOptions = {
    openapi: '3.0.0',
    info: {
        title: 'SweeMe - API',
        version: '1.0.0',
        description: 'API documentation for SweeMe project'
    },
    components: {
        securitySchemes: {
            BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    security: [
        {
            BearerAuth: []
        }
    ],
    servers: [
        {
            url: 'http://localhost:8080',
            description: 'Development server'
        },
        {
            url: 'https://sweeme.com.ua',
            description: 'Production server'
        }
    ],
};

const swaggerDocs = swaggerJsdoc({
    swaggerDefinition: swaggerOptions,
    apis: ['./routes/userRouter.js', './routes/userSettingsRouter.js', './routes/devicesRouter.js', './routes/deviceSettingsRouter.js', './routes/rolesRouter.js', './routes/temperatureRouter.js', './routes/humidityRouter.js', './routes/ipAddressRouter.js', './routes/notificationRouter.js', './routes/openAiLogsRouter.js']
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

/** --- Routers --- */

const userRouter = require('./routes/userRouter');
app.use("/api/v1/users", userRouter);

const userSettingsRouter = require('./routes/userSettingsRouter');
app.use("/api/v1/userSettings", userSettingsRouter);

const devicesRouter = require('./routes/devicesRouter');
app.use("/api/v1/devices", devicesRouter);

const deviceSettingsRouter = require('./routes/deviceSettingsRouter');
app.use("/api/v1/deviceSettings", deviceSettingsRouter);

const rolesRouter = require('./routes/rolesRouter');
app.use("/api/v1/roles", rolesRouter);

const temperatureRouter = require('./routes/temperatureRouter');
app.use("/api/v1/temperature", temperatureRouter);

const humidityRouter = require('./routes/humidityRouter');
app.use("/api/v1/humidity", humidityRouter);

const ipAddressRouter = require('./routes/ipAddressRouter');
app.use("/api/v1/ipaddress", ipAddressRouter);

const notificationRouter = require('./routes/notificationRouter');
app.use("/api/v1/notification", notificationRouter);

const openAiLogsRouter = require('./routes/openAiLogsRouter');

app.use("/api/v1/openailogs", openAiLogsRouter);

app.use("/api/v1", api);

app.use('/api/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/v1/google-test', (req, res) => {
    res.send('<a href="/api/v1/google">Authenticate with Google</a>')
});

app.get('/api/v1/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/api/v1/google/callback',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/api/v1/register'
    })
)

app.use(express.json());

app.get('/', isLoggedIn, (req, res) => {
    res.send('Hello!')
});

// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

module.exports = app;