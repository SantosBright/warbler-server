require('dotenv').config();
const  express          =  require('express'),
        app             =  express(),
        cors            =  require('cors'),
        bodyParser      =  require('body-parser'),
        errorHandler    =  require('./handlers/error')
        authRoutes      =  require('./routes/auth'),
        messagesRoutes      =  require('./routes/messages');


const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/users/:id/messages', messagesRoutes);

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Warber server has on ${PORT}`));