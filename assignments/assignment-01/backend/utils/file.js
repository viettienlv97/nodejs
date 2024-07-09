import fs from 'fs'
import path from 'path'
import dataPath from '../data/index.js'

export const readFromFile = (READ_FILE) => {
  const data = JSON.parse(
    fs.readFileSync(path.join(dataPath, READ_FILE)),
    'utf-8'
  )
  return data
}
