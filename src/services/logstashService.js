const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json } = format;
const { sendLog } = require('./graylogService');

const logger = createLogger({
  format: combine(
    timestamp(),
    json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'exceptions.log' })
  ],
  rejectionHandlers: [
    new transports.File({ filename: 'rejections.log' })
  ]
});

logger.stream = {
  write: function(message, encoding) {
    try {
      const logMessage = JSON.parse(message);
      logger.info(logMessage);
      sendLog(logMessage);
    } catch (error) {
      console.error('Error processing log message:', error.message, error.stack);
    }
  },
};

module.exports = logger;