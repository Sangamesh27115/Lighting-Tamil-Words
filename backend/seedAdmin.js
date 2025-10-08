require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const ADMIN_EMAIL = 'admin@tamilwords.com';
const ADMIN_PASSWORD = 'Admin@123Tamil';
const ADMIN_USERNAME = 'superadmin';

const createAdminUser = async () => {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || process.env.MONGO_URL;
    
    if (!mongoUri) {
      console.error('❌ MongoDB connection string not found!');
      console.error('Please set MONGO_URI or MONGO_URL in your .env file');
      process.exit(1);
    }
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists');
      console.log('📧 Email:', ADMIN_EMAIL);
      console.log('👤 Username:', existingAdmin.username);
      process.exit(0);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    // Create admin user
    const adminUser = new User({
      username: ADMIN_USERNAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: 'admin',
      fullName: 'System Administrator',
      points: 0,
      level: 1,
    });

    await adminUser.save();

    console.log('✅ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:    ', ADMIN_EMAIL);
    console.log('🔐 Password: ', ADMIN_PASSWORD);
    console.log('👤 Username: ', ADMIN_USERNAME);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('⚠️  Please change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
};

createAdminUser();
