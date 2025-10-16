import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";
import Seller from "./Seller.js";

const VendorProfile = sequelize.define(
  "VendorProfile",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Sellers',
        key: 'id'
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gstNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    panNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    permanentStreet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permanentCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permanentState: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permanentPincode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    residentialStreet: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    residentialCity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    residentialState: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    residentialPincode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountHolderName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ifscCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    branchName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: true,
    tableName: 'VendorProfiles'
  }
);

// Relationship
Seller.hasOne(VendorProfile, { foreignKey: 'sellerId' });
VendorProfile.belongsTo(Seller, { foreignKey: 'sellerId' });

export default VendorProfile;