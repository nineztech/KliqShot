import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";
import bcrypt from "bcrypt";

const Seller = sequelize.define(
  "Seller",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [10, 10],
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 100],
      }
    },
      // ✅ New field added here
    isProfileCompleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    // ✅ Verification fields
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    verifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: async (seller) => {
        if (seller.password) {
          const saltRounds = 10;
          seller.password = await bcrypt.hash(seller.password, saltRounds);
        }
      },
      beforeUpdate: async (seller) => {
        if (seller.changed('password')) {
          const saltRounds = 10;
          seller.password = await bcrypt.hash(seller.password, saltRounds);
        }
      },
    }
  }
);

// Compare password instance method
Seller.prototype.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default Seller;