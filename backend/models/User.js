import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnection.js';

const User = sequelize.define('User', {
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
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    validate: {
      len: [10, 20]
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [8, 128],
      isStrongPassword(value) {
        // Must contain at least one uppercase letter
        if (!/[A-Z]/.test(value)) {
          throw new Error('Password must contain at least one uppercase letter');
        }
        // Must contain at least one lowercase letter
        if (!/[a-z]/.test(value)) {
          throw new Error('Password must contain at least one lowercase letter');
        }
        // Must contain at least one number
        if (!/[0-9]/.test(value)) {
          throw new Error('Password must contain at least one number');
        }
        // Must contain at least one special character
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          throw new Error('Password must contain at least one special character');
        }
      }
    }
  },
  profileImage: {
    type: DataTypes.STRING(500),
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other', 'prefer_not_to_say'),
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: 'India'
  },
  zipCode: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  isPhoneVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
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
  emailVerificationToken: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  passwordResetToken: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  passwordResetExpires: {
    type: DataTypes.DATE,
    allowNull: true
  },
  registrationOtp: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  registrationOtpExpires: {
    type: DataTypes.DATE,
    allowNull: true
  },
  role: {
    type: DataTypes.ENUM('user', 'seller', 'admin'),
    defaultValue: 'user',
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  indexes: [
    {
      unique: true,
      fields: ['email']
    },
    {
      fields: ['phone']
    },
    {
      fields: ['role']
    },
    {
      fields: ['isActive']
    }
  ]
});

// Instance methods
User.prototype.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

User.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());
  // Remove sensitive data
  delete values.password;
  delete values.emailVerificationToken;
  delete values.passwordResetToken;
  delete values.passwordResetExpires;
  delete values.registrationOtp;
  delete values.registrationOtpExpires;
  return values;
};

export default User;
