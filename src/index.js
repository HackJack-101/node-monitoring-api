import express from 'express';
import compression from 'compression';

import routes from './api';
import configuration from './configuration';

const app = express();

app.use(compression());

app.use('/api/', (req, res, next) => {
    const { headers } = req;
    if (headers && headers['api-token'] === configuration.token) {
        return next();
    }
    return res.sendStatus(401);
});

app.use('/api/', routes);

app.listen(8010, () => {
    console.log(`The server is listening on port ${8010}`);
});
