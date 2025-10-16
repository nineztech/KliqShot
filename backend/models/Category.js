import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConnection.js';

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  image: {
    type: DataTypes.TEXT('long'), // LONGTEXT for MySQL - supports large base64 images
    allowNull: true
  },
  parentId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'categories',
      key: 'id'
    },
    field: 'parent_id'
  },
  photographerCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    field: 'photographer_count'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
    field: 'is_active'
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
    field: 'display_order'
  }
}, {
  tableName: 'categories',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  indexes: [
    {
      fields: ['parent_id']
    },
    {
      fields: ['is_active']
    },
    {
      fields: ['display_order']
    },
    {
      fields: ['name']
    }
  ]
});

// Self-referencing associations
Category.hasMany(Category, {
  as: 'subCategories',
  foreignKey: 'parentId',
  onDelete: 'CASCADE'
});

Category.belongsTo(Category, {
  as: 'parent',
  foreignKey: 'parentId'
});

// Instance methods
Category.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());
  return values;
};

export default Category;

