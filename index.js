//requires all one after another 


//dotenv
require('dotenv').config();
//swagger
const swagger = require('swagger-ui-express')
const swaggerSpec = require('./config/swagger.js');


//express setup here
const express = require('express');
const app = express();




//routers here
const authRouter = require('./routes/authRouter.js');
const userRouter = require('./routes/userRouter.js');
const vendorRouter = require('./routes/vendorRouter.js');
const adminRouter = require('./routes/adminRouter.js');

//middleware here
const {adminMiddleware,vendorMiddleware,userMiddleware} = require('./middlewares.js/roleMIddleware.js');

//mongodb config 
const mongodbConfig = require('./config/mongoDBConfig.js');
mongodbConfig();


//for reading json file 

app.use(express.json());

// for swagger 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//api starts
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userMiddleware,userRouter);

// app.use('/api/v1/admin', adminMiddleware, adminRouter);
app.use('/api/v1/admin', adminRouter);

app.use('/api/v1/vendor',vendorRouter); // middleware off for now


//port

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server is running on port : ${port}`);
});