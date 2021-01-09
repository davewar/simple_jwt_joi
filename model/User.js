const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
          name: {type: String, trim:true, required: true, min:6, max:255 },
          email: {type: String, trim:true},
          password: {type: String, trim:true,required: true, min:6, max:1024}
  

})
//

module.exports = mongoose.model('User',userSchema)