import path from 'path'
import { fileURLToPath } from 'url'

const dataPath = path.dirname(fileURLToPath(import.meta.url))

export default dataPath
