import { sequelize } from '../config/dbConnection.js';
import User from './User.js';
import Admin from './Admin.js';
import Category from './Category.js';
import Seller from './Seller.js';

// Import other models as they are created
// import Product from './Product.js';
// import Order from './Order.js';

// Define associations
const defineAssociations = () => {
  // Seller-Category associations (Many-to-Many)
  // A seller (photographer) can belong to multiple categories
  // A category can have multiple sellers (photographers)
  Seller.belongsToMany(Category, {
    through: 'seller_categories',
    foreignKey: 'seller_id',
    otherKey: 'category_id',
    as: 'categories'
  });

  Category.belongsToMany(Seller, {
    through: 'seller_categories',
    foreignKey: 'category_id',
    otherKey: 'seller_id',
    as: 'sellers'
  });

  // Other associations will be defined here as other models are created
  // Example associations:
  
  // User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
  // User.hasMany(Product, { foreignKey: 'sellerId', as: 'products' });
  
  // Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  // Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'orderItems' });
  
  // Product.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });
  // Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
};

// Initialize associations
defineAssociations();

// Sync models function
export const syncModels = async () => {
  try {
    await sequelize.sync({ alter: true }); // Set to true to auto-update table structure
    console.log('✅ All models synchronized successfully');
    console.log('⚠️  IMPORTANT: Set alter to false in production!');
  } catch (error) {
    console.error('❌ Error synchronizing models:', error);
    throw error;
  }
};

// Export models and sequelize instance
export {
  sequelize,
  User,
  Admin,
  Category,
  Seller
  // Export other models as they are created
  // Product,
  // Order
};
