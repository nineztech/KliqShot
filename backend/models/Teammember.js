import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/dbConnection.js";

const TeamMember = sequelize.define(
  "TeamMember",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First name is required"
        },
        len: {
          args: [2, 50],
          msg: "First name must be between 2 and 50 characters"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Last name is required"
        },
        len: {
          args: [2, 50],
          msg: "Last name must be between 2 and 50 characters"
        }
      }
    },
    Owneremail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Please provide a valid email address"
        },
        notEmpty: {
          msg: "Email is required"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Please provide a valid email address"
        },
        notEmpty: {
          msg: "Email is required"
        }
      }
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Mobile number is required"
        },
        len: {
          args: [10, 15],
          msg: "Mobile number must be between 10 and 15 digits"
        },
        isNumeric: {
          msg: "Mobile number must contain only digits"
        }
      }
    },
    designation: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '[]',
      get() {
        const rawValue = this.getDataValue('designation');
        if (!rawValue) return [];
        
        if (Array.isArray(rawValue)) return rawValue;
        
        try {
          const parsed = JSON.parse(rawValue);
          return Array.isArray(parsed) ? parsed : [rawValue];
        } catch {
          return [rawValue];
        }
      },
      set(value) {
        if (Array.isArray(value)) {
          this.setDataValue('designation', JSON.stringify(value));
        } else if (typeof value === 'string') {
          try {
            const parsed = JSON.parse(value);
            this.setDataValue('designation', JSON.stringify(Array.isArray(parsed) ? parsed : [parsed]));
          } catch {
            this.setDataValue('designation', JSON.stringify([value]));
          }
        } else {
          this.setDataValue('designation', JSON.stringify([value]));
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Category is required"
        },
        isIn: {
          args: [['Full-time', 'Part-time', 'Freelance', 'Contract']],
          msg: "Invalid category selected"
        }
      }
    },
    experience: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Experience is required"
        },
        isIn: {
          args: [['0-1 years', '1-3 years', '3-5 years', '5+ years']],
          msg: "Invalid experience range selected"
        }
      }
    },
    availability: {
      type: DataTypes.ENUM('Available', 'Busy', 'On Leave'),
      defaultValue: 'Available',
      allowNull: false
    },
    bookingsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: "Bookings count cannot be negative"
        }
      }
    },
    completedBookings: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      validate: {
        min: {
          args: [0],
          msg: "Completed bookings count cannot be negative"
        }
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    // ✨ ADD THIS FIELD
    isOwner: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      comment: 'Indicates if this team member is the owner of the seller account'
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    timestamps: true,
    tableName: 'TeamMembers',
    indexes: [
      {
        fields: ['sellerId']
      },
      {
        fields: ['email']
      },
      {
        fields: ['availability']
      },
      {
        fields: ['isOwner'] // ✨ ADD THIS INDEX
      }
    ]
  }
);

// Instance method to get full name
TeamMember.prototype.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

// Instance method to increment bookings
TeamMember.prototype.incrementBookings = async function() {
  this.bookingsCount += 1;
  await this.save();
  return this;
};

// Instance method to decrement bookings
TeamMember.prototype.decrementBookings = async function() {
  if (this.bookingsCount > 0) {
    this.bookingsCount -= 1;
    await this.save();
  }
  return this;
};

export default TeamMember;