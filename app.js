const bodyParser = require("body-parser");
const express = require("express");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require("dotenv").config();
require("./auth/passport");

require('./models/user');

const middlewares = require('./middlewares');
const api = require ('./api');
const app = express();

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'SweeMe - API',
            version: '1.0.0',
            description: 'API documentation for SweeMe project'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            },
            {
                url: 'https://sweeme.com.ua',
                description: 'Production server'
            }
        ]
    },
    apis: ['./routes/userRouter.js', './routes/userSettingsRouter.js', './routes/devicesRouter.js', './routes/deviceSettingsRouter.js', './routes/rolesRouter.js', './routes/temperatureRouter.js', './routes/humidityRouter.js', './routes/ipAddressRouter.js', './routes/notificationRouter.js', './routes/openAiLogsRouter.js']
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Routers
    // User router
const userRouter = require('./routes/userRouter');
app.use("/api/v1/users", userRouter);

    // UserSettings router
const userSettingsRouter = require('./routes/userSettingsRouter');
app.use("/api/v1/userSettings", userSettingsRouter);

    // Device router
const devicesRouter = require('./routes/devicesRouter');
app.use("/api/v1/devices", devicesRouter);

    // DeviceSettings router
const deviceSettingsRouter = require('./routes/deviceSettingsRouter');
app.use("/api/v1/deviceSettings", deviceSettingsRouter);

    // Roles router
const rolesRouter = require('./routes/rolesRouter');
app.use("/api/v1/roles", rolesRouter);

    // Temperature router
const temperatureRouter = require('./routes/temperatureRouter');
app.use("/api/v1/temperature", temperatureRouter);

    // Humidity router
const humidityRouter = require('./routes/humidityRouter');
app.use("/api/v1/humidity", humidityRouter);

    // IP Address router
const ipAddressRouter = require('./routes/ipAddressRouter');
app.use("/api/v1/ipaddress", ipAddressRouter);

    // Notification router
const notificationRouter = require('./routes/notificationRouter');
app.use("/api/v1/notification", notificationRouter);

    // Open AI Logs router
const openAiLogsRouter = require('./routes/openAiLogsRouter');
app.use("/api/v1/openailogs", openAiLogsRouter);

    // Main route
app.use("/api/v1", api);

    // Swagger route
app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "App.js"
    });
});




// app.use(middlewares.notFound);
// app.use(middlewares.errorHandler);

module.exports = app;