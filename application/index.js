import express from 'express';
import session from 'express-session';

import envConf from '../config/envConf.js';

import client from './redis.js';
import { RedisStore } from 'connect-redis';

import cors from 'cors';

import {requireAuth} from './auth.js';

import dishRoutes from "./routes/dish.js";
import tagRoutes from "./routes/tag.js";
import ingredientsRoutes from "./routes/ingredients.js";
import categoriesRoutes from './routes/categories.js'

import loginRoutes from './routes/login/login.js'
import logoutRoute from './routes/login/logout.js'

const port = 3000;
const hostname = envConf.hostname;

const app = express();

app.use(express.json());

const allowedOrigins = envConf.allowedOrigins;

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));

app.use(session({
    store: new RedisStore({
        client: client
    }),
    secret: envConf.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: envConf.secure,
        sameSite: envConf.sameSite,
        priority: 'medium',
        maxAge: 1000 * 60 * 60 * 24 * 30
    }
}));


app.use('/api', loginRoutes);
app.use('/api', logoutRoute);

app.get('/api/me', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({
            user: '',
            loggedIn: false,
            message: 'Não autenticado'
        });
    }

    res.json({
        user: req.session.user,
        loggedIn: true,
        message: '',
    });
});


app.use('/api', requireAuth);

app.use('/api', dishRoutes);
app.use('/api', tagRoutes);
app.use('/api', ingredientsRoutes);
app.use('/api', categoriesRoutes);

app.listen(port, hostname, () => {
    console.log(`Example app listening on port http://${hostname}:${port}/`);
});