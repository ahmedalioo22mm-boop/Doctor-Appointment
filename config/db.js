import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config(); // لاستدعاء المتغيرات من ملف .env

const connectDB = async () => {
  try {
    // محاولة الاتصال بقاعدة البيانات باستخدام الرابط من ملف .env
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB Connected Successfully...');
  } catch (err) {
    // في حال فشل الاتصال، نطبع الخطأ ونوقف عمل الخادم
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1); // إيقاف العملية مع رمز فشل
  }
};

export default connectDB;