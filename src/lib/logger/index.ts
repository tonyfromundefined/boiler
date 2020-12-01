import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
})

switch (process.env.NODE_ENV) {
  case 'development':
    logger.add(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple()
        ),
      })
    )
    break
  default:
    logger.add(
      new winston.transports.Console({
        format: winston.format.json(),
      })
    )
    break
}

export const stream = {
  write(message: string) {
    logger.info(message.trim())
  },
}

export default logger
