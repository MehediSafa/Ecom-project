const swaggerJsdoc = require('swagger-jsdoc');

const port = process.env.PORT || 5000;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ecom Project API',
            version: '1.0.0',
            description:
                'REST API documentation for the Ecom Project backend (auth, user, vendor and admin modules).',
        },
        servers: [
            {
                url: `http://localhost:${port}/api/v1`,
                description: 'Local development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description:
                        "Send the access token returned by /auth/login as: Authorization: Bearer <token>",
                },
            },
            schemas: {
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean', example: false },
                        message: { type: 'string', example: 'Something went wrong' },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', example: '654a1f2b3c9d4e0012abcd34' },
                        fullName: { type: 'string', example: 'John Doe' },
                        email: { type: 'string', example: 'john@example.com' },
                        role: { type: 'string', enum: ['user', 'admin'], example: 'user' },
                        status: { type: 'string', enum: ['active', 'deactive'], example: 'active' },
                        isVerified: { type: 'boolean', example: false },
                    },
                },
            },
        },
        // applied to every route by default; public routes override with security: []
        security: [{ bearerAuth: [] }],
    },
    apis: ['./routes/*.js'], // where the @swagger JSDoc comments live
};

module.exports = swaggerJsdoc(options);