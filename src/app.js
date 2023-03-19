const express = require('express');
require('dotenv').config();

const i18next = require('i18next');
const i18nextMiddleware = require('i18next-http-middleware');
const Backend = require('i18next-fs-backend');

const { handleError } = require('./utils/response/error');
const { handleSuccess } = require('./utils/response/success');

const app = express();

// app.use(cors());

app.use(i18nextMiddleware.handle(i18next));
i18next
  .use(i18nextMiddleware.LanguageDetector)
  .use(Backend)
  .init({
    fallbackLng: 'en',

    backend: {
      loadPath: `${__dirname}/locales/{{lng}}/{{ns}}.json`,
    },
    detection: {
      order: ['header'],
      caches: false,
    },
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.disable('x-powered-by');

app.use('/', require('./healthCheck'));
// app.use('/api', require('./app/routes/mainRouter'));

app.use('*', (req, res) =>
  res.status(404).send(req.t('CommonError.pageNotFound'))
);

app.use((service, req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  if (service instanceof Error) {
    return handleError(service, req, res);
  }
  return handleSuccess(service, req, res);
});

module.exports = app;
