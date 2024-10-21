// // model/UserModel.js
// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   age: { type: Number, required: true },
//   password: { type: String, required: true },
//   accountNumber: { type: String, required: true },
//   ifscCode: { type: String, required: true },
// });

// const UserModel = mongoose.model("User", UserSchema);
// module.exports = { UserModel };


// model/UserModel.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  accountNumber: { type: String, required: true },
  ifscCode: { type: String, required: true },
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = { UserModel };

