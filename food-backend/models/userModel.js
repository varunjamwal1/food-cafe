const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email"],
  },

  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Phone must be 10 digits"],
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  // ✅ ADD ROLE FIELD
  role: {
    type: String,
    enum: ["waiter", "cashier", "admin"],
    required: true,
    default: "waiter",
  },

}, { timestamps: true });


// HASH PASSWORD (ONLY HERE — correct)
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
