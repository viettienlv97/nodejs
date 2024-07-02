import { fileURLToPath } from 'url'
import { dirname } from 'path'

const dataPath = dirname(fileURLToPath(import.meta.url))
export default dataPath
