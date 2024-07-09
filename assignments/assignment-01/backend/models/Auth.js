import { readFromFile } from '../utils/file.js'
import { DATA } from '../constants.js'

class User {
  static getAuth(token) {
    const auth = readFromFile(DATA.USER_TOKEN)
    const user = auth.find((u) => u.token === token)
    if (user) return true
    return false
  }
}

export default User
