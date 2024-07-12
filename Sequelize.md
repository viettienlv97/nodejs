**Sequelize**

_- Sequelize là 1 thư viện ORM (Object-Relational Mapping) cho NodeJS, giúp tương tác với CSDL SQL dễ dàng và hiệu quả._

_- Cấu hình_

```js
import { Sequelize } from 'sequelize'
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql' // 'mysql', 'sqlite', 'postqres', 'mssql'
})
```

_- Định nghĩa mô hình (Models)_

```js
import { Datatypes } from 'sequelize'
const User = sequelize.define('user', {
  id: {
    type: Datatypes.INTERGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Datatypes.STRING,
    allowNull: false
  },
  email: {
    type: Datatypes.STRING,
    allowNull: false,
    unique: true
  }
})
```

_- Thiết lập mối quan hệ_

- Sử dụng: [hasOne], [belongsTo], [hasMany], [belongsToMany]
- Một - Một (One-to-One)

```js
User.hasOne(Profile)
Profile.belongsTo(User)
```

- Một - Nhiều (One-to-Many)

```js
User.hasMany(Post)
Post.belongsTo(User)
```

- Nhiều - Nhiều (Many-to-Many)

```js
User.belongsToMany(Role, { through: 'UserRole' })
Role.belongsToMany(User, { through: 'UserRole' })
```

_- Các thao tác CRUD_

- Tạo bản ghi (Create)

```js
const newUser = await User.create({
  username: 'viettien',
  email: 'viettien@gmail.com'
})
```

- Đọc dữ liệu (Read)

```js
const users = await User.findAll()
const user = await User.findOne({
  where: {
    username: 'viettien'
  }
})
```

- Cập nhật bản ghi (Update)

```js
await User.update(
  { email: 'viettienvu.97@gmail.com' },
  {
    where: {
      username: 'viettien'
    }
  }
)
```

- Xoá bản ghi (Delete)

```js
await User.destroy({
  where: {
    username: 'viettien'
  }
})
```

_- Đồng bộ hoá (Synchronization)_

- Sử dụng phương thức .sync() để đồng bộ các mô hình với cơ sở dữ liệu.

```js
sequelize.sync({ force: true }).then(() => {
  console.log('All models were synchronized successfully!')
})
```

_- Các magic methods trong Sequelize_

- One-to-One (hasOne, belongsTo)

```js
User.hasOne(Profile)
Profile.belongsTo(User)
// User
const user = await User.findOne()
user.getProfile()
user.setProfile()
user.createProfile()
// Profile
const profile = await Profile.findOne()
profile.getUser()
profile.setUser()
profile.createUser()
```

- One-to-Many (hasMany, belongsTo)

```js
User.hasMany(Post)
Post.belongsTo(User)
// User
const user = await User.findOne()
user.getPosts() // lấy tất cả các Post liên quan đến user
user.countPosts() // Đếm số lượng Post
user.hasPost()
user.setPosts()
user.addPost()
user.addPosts()
user.removePost()
user.removePosts()
user.createPost()
// Post
const post = await Post.findOne()
post.getUser()
post.setUser()
post.createUser()
```

- Many-to-Many (belongsToMany)

```js
User.belongsToMany(Role, { through: 'userRole' })
Role.belongsToMany(User, { through: 'userRole' })

// User || Role
// Các method tương tự User với Post
```

_- Các tuỳ chọn khác_

- Mối quan hệ với Alias (Alias)

```js
User.hasMany(Post, { as: 'Articles' })
//
const userWithPosts = await User.findOne({
  where: { id: 1 },
  include: [{ model: Post, as: 'Articles' }]
})
```

- Ràng buộc (Constraints)

  - Sequelize hỗ trợ các tuỳ chọn như **onDelete**, **onUpdate** và **constraints**

```js
User.hasMany(Post, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  constraints: true
})
```

- Scope
  - Scope giúp định nghĩa các điều kiện truy vấn mặc định:

```js
const User = sequelize.define(
  'user',
  {
    username: DataTypes.STRING,
    email: DataTypes.STRING
  },
  {
    defaultScope: {
      where: {
        active: true
      }
    },
    scopes: {
      deleted: { where: { deleted: true } }
    }
  }
)
// Sử dụng scope
const activeUsers = await User.findAll()
const deletedUsers = await User.scope('deleted').findAll()
```

- Migration
  - Sequelize cung cấp công cụ di trú (migration) để quản lý và áp dụng các thay đổi trong cấu trúc CSDL

```bash
npx sequelize-cli init
npx sequelize-cli model:generate --name User --attributes username:string,email:string
npx sequelize-cli db:migrate
```
