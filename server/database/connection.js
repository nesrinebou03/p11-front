const mongoose = require('mongoose')
const databaseUrl =
  process.env.DATABASE_URL || 'mongodb+srv://boukhatemnk:QX6uqxQViGB5bfe7@openclassroom.flfij.mongodb.net/?retryWrites=true&w=majority&appName=Openclassroom'
 
module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl, { useNewUrlParser: true })
    console.log('Database successfully connected')
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`)
    throw new Error(error)
  }
}
