import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnection.js';
import bcrypt from 'bcrypt';

const Admin = sequelize.define(
  'Admin',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 255]
      }
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate: {
        len: [10, 20]
      }
    },
    profileImage: {
      type: DataTypes.STRING(500),
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM('admin', 'super_admin'),
      defaultValue: 'admin',
      allowNull: false
    }
  },
  {
    tableName: 'admins',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    indexes: [
      {
        unique: true,
        fields: ['email']
      },
      {
        fields: ['isActive']
      },
      {
        fields: ['role']
      }
    ],
    hooks: {
      beforeCreate: async (admin) => {
        if (admin.password) {
          const saltRounds = 10;
          admin.password = await bcrypt.hash(admin.password, saltRounds);
        }
      },
      beforeUpdate: async (admin) => {
        if (admin.changed('password')) {
          const saltRounds = 10;
          admin.password = await bcrypt.hash(admin.password, saltRounds);
        }
      }
    }
  }
);

// Instance methods
Admin.prototype.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

Admin.prototype.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

Admin.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());
  // Remove sensitive data
  delete values.password;
  return values;
};

export default Admin;

