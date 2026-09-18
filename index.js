require('dotenv').config();

const express = require('express');
const app = express();

const authRouter = require('./routes/authRouter.js');
const userRouter = require('./routes/userRouter.js');
const vendorRouter = require('./routes/vendorRouter.js');
const adminRouter = require('./routes/adminRouter.js');
const mongodbConfig = require('./config/mongoDBConfig.js');
const {adminMiddleware,vendorMiddleware,userMiddleware} = require('./middlewares.js/roleMIddleware.js');

mongodbConfig();

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userMiddleware,userRouter);

app.use('/api/v1/admin', adminMiddleware, adminRouter);
app.use('/api/v1/vendor', vendorMiddleware,vendorRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server is running on port : ${port}`);
});