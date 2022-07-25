const mongoose = require('mongoose')
// "mongodb+srv://Mahesh:Mahesh@cluster0.bdezf.mongodb.netmytablereact?retryWrites=true&w=majority"
module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    try {
        mongoose.connect(process.env.DATABASE_ACCESS, connectionParams)
        console.log('Database connected')
    } catch (error) {
        console.log('Database error', error)
    }
}