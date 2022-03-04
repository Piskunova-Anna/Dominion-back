require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const multer  = require("multer");

const app = express();
const { PORT = 3002 } = process.env;
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const errorsHandler = require('./errors/errorsHandler');
const { requestLogger, errorLogger } = require('./errors/logger');
const router = require('./routes/index');
const { limiter } = require('./middlewares/limiter');
/*const cors = require('cors');
const CORS_METHODS = ['GET', 'PUT', 'POST', 'DELETE', 'PATCH', 'HEAD'];
const CORS_HEADERS = ['Authorization', 'Content-Type', 'Accept'];
const ALLOWED_CORS = [
  'http://localhost:3000',
  'https://localhost:3000',
];

app.use(cors({
  origin(origin, callback) {
    if (ALLOWED_CORS.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error(messages.corsErr));
    }
  },
  methods: CORS_METHODS,
  allowedHeaders: CORS_HEADERS,
  credentials: true,
}));
app.options('*', cors());*/

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/domdb', {
 
});

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true,
}));

app.use(helmet());
app.use(limiter);
// подключаем логгер запросов
app.use(requestLogger);


// подключаемя куки
app.use(cookieParser());

// поделючаем роуты
app.use(router);

// подключаем логгер ошибок
app.use(errorLogger);

// валидация запросов
app.use(errors());

// обработчик ошибок
app.use(errorsHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
