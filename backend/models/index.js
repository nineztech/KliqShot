import { sequelize } from '../config/dbConnection.js';
import User from './User.js';

// Import other models as they are created
// import Product from './Product.js';
// import Order from './Order.js';
// import Category from './Category.js';

// Define associations
const defineAssociations = () => {
  // User associations will be defined here as other models are created
  // Example associations:
  
  // User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
  // User.hasMany(Product, { foreignKey: 'sellerId', as: 'products' });
  
  // Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  // Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'orderItems' });
  
  // Product.belongsTo(User, { foreignKey: 'sellerId', as: 'seller' });
  // Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
  
  // Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });
};

// Initialize associations
defineAssociations();

// Sync models function
export const syncModels = async () => {
  try {
    await sequelize.sync({ alter: false }); // Set to true only in development
    console.log('✅ All models synchronized successfully');
  } catch (error) {
    console.error('❌ Error synchronizing models:', error);
    throw error;
  }
};

// Export models and sequelize instance
export {
  sequelize,
  User
  // Export other models as they are created
  // Product,
  // Order,
  // Category
};
