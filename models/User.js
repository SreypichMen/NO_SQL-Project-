const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const crypto = require("crypto");
const mongoosePaginate = require("mongoose-paginate-v2");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email"],
    },
    firstname: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Minimum password is 8 characters"],
    },
    confirmPassword: {
      type: String,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Passwords are not the same",
      },
    },
    role: {
      type: String,
      default: "User",
      validate: {
        validator: function (el) {
          return el === "User"; // Modified validation logic
        },
        message: "You are not allowed to define the user role",
      },
    },
    profile_img: {
      type: String,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Before saving the document
userSchema.pre("save", async function (next) {
  // If the email is not present or modified, do nothing
  if (!this.isModified("email")) return next();

  // Check if the email is not null
  if (!this.email) {
    return next(new Error("Email cannot be null"));
  }

  next();
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  // If not modified password, do nothing
  if (!this.isModified("password")) return next();

  // Hash password
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);

  // Delete password confirm field
  this.confirmPassword = undefined;

  next();
});

// Static method to login user
userSchema.statics.login = async function (email, password) {
  try {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw new Error("Incorrect password");
    }
    throw new Error("Incorrect email");
  } catch (error) {
    throw error;
  }
};

// Create reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.plugin(mongoosePaginate);
const User = mongoose.model("User", userSchema);
module.exports = User;
