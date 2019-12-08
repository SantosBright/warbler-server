require('dotenv').config();
const  express              =  require('express'),
        app                 =  express(),
        db                  =  require('./models'),
        cors                =  require('cors'),
        errorHandler        =  require('./handlers/error')
        authRoutes          =  require('./routes/auth'),
        messagesRoutes      =  require('./routes/messages'),
        { loginRequired, ensureCorrectUser } = require('./middleware/auth');


const PORT = 8081;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', authRoutes);
app.use(
    '/api/users/:id/messages',
    loginRequired,
    ensureCorrectUser,
    messagesRoutes
);

app.get('/api/messages', loginRequired, async function(req, res, next){
    try{
        let messages = await db.Message.find()
            .sort({createdAt: 'desc'})
            .populate('user', {
                username: true,
                profileImgUrl: true
            });
        return res.status(200).json(messages);
    } catch(err) {
        return next(err);
    }
});

app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Warber server has on ${PORT}`));