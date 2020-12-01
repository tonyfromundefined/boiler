import { Buffer } from 'buffer/'

export function encodeCursor(plaintext: string) {
  return Buffer.from(plaintext, 'utf-8').toString('base64')
}

export function decodeCursor(base64text: string) {
  return Buffer.from(base64text, 'base64').toString('utf-8')
}
