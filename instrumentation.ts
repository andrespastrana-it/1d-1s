import dbConnect from './lib/db';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    try {
      await dbConnect();
      console.log('MongoDB connected successfully in instrumentation');
    } catch (error) {
      console.error('Failed to connect to MongoDB in instrumentation:', error);
      // Don't throw the error as it would prevent the app from starting
      // Just log it and continue
    }
  } else {
    console.log('Skipping MongoDB connection in non-Node.js environment');
  }
}