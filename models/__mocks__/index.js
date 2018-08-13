const db = {}
const User = {}
User.findById = () => {
  return new Promise((resolve, reject) => {
    resolve({ data: 'mock data exist from User.findByID' })
  })
}
User.findAll = () => {
  return new Promise((resolve, reject) => {
    resolve({
      'createdAt': '2018-08-11',
      'email': 'da@gmail.com',
      'id': 8,
      'name': 'da',
      'password': '$2a$10$5Dx/1.SrUNsOpTCvTyvLCuxqqxVx.piqD5pMGVIPiNPp9UdDiB38O',
      'phone': 1231231122,
      'updatedAt': '2018-08-11'
    })
  })
}
db.User = User

console.log('inside modes/__mock__/index.js')
module.exports = db
