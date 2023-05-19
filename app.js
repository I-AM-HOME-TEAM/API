const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors")
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require("dotenv").config();
require("./auth/passport");

require('./models/user');

const middlewares = require('./middlewares');
const api = require ('./api');
const app = express();

const whitelist = ["http://localhost:3000"]
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
            url: 'http://localhost:3000',
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

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "App.js"
    });
});

// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

module.exports = app;