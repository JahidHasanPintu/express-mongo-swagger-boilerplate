import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import config from "./index.js";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express Mongo API",
      version: "1.0.0",
      description: "API documentation for express mongo boilerplate- YOU CAN EDIT THIS IN swagger.config.js FILE",
    },
    servers: [
      {
        url: `http://localhost:${config.port}/api/v1`,
        description: "Local server",
      },
    ],
  },

  apis: [
    "./src/app/modules/*/*.routes.js", 
    "./src/app/modules/*/*.schema.js",
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
export const swaggerUiMiddleware = swaggerUi;
