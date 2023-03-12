const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const AdminSchema = new mongoose.Schema({

    name:{
        type: String,
        require: true,
    },
    department: {
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    avatar:{
        type: String,
        require: true
    }

})

UserSchema.pre('save', function(next) {
    if(this.isModified('password')){
        bcrypt.hash(this.password, 8, (err, hash) => {
            if(err) return next(err)
            this.password = hash
            next()
        })
    }
})

UserSchema.methods.comparePassword = async function (password) {
    
    if(!password) throw new Error('Password is missing, can not compare')

    try {
        const result = await bcrypt.compare(password, this.password)
        return result
    } catch (error) {
        console.log('Error while comparing password!', error.message)
    }
}

const collection = new mongoose.model("UserAccount", UserSchema)
module.exports = collection