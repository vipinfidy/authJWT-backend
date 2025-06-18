const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();
app.use(express.json());

//Rouute
app.use('/api/auth', authRoutes);

//Protected routes
const protectedRoutes = require('./routes/protectedRoutes');
app.use('/api', protectedRoutes);

// for swagger

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



//Database connection

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Database connected');
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
