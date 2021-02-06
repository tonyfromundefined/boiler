import Agenda from 'agenda'
import mongoose from 'mongoose'

import logger from '@internal/logger'

let agenda: Agenda | null = null

export function getAgenda() {
  if (agenda) {
    return agenda
  }

  return (agenda = new Agenda({
    mongo: mongoose.connection.db,
    db: {
      collection: 'agenda_jobs',
    },
  }))
}

export async function startAgenda() {
  await getAgenda().start()
  logger.info('Agenda is started')
}

export async function stopAgenda() {
  await getAgenda().stop()
  logger.info('Agenda is stopped')
}
