const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const cookieParser = require('cookie-parser');
const NotFoundError = require('./errors/not-found-error');
const cardsRoutes = require('./routes/cards');
const usersRoutes = require('./routes/users');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

const allowedCors = [
  'https://threetattoo-mesto.nomoredomains.rocks',
  'https://api.threetattoo-mesto.nomoredomains.rocks',
  'http://localhost:3000',
];

app.use(cors({
  origin: allowedCors,
}));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}),
login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/(https?:\/\/)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~]*)*(#[\w-]*)?(\?.*)?/),
  }),
}),
createUser);

app.use('/', auth, cardsRoutes);
app.use('/', auth, usersRoutes);

app.use('*', () => {
  throw new NotFoundError('Ресурс не найден');
});

app.use(errorLogger);

app.use(errors());

app.use((error, req, res, next) => {
  const { statusCode = 500, message } = error;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Произошла ошибка на сервере'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
