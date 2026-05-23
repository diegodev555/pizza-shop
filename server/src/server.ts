import app from './app.js';
import { config } from './config/index.js';
import prisma from './utils/prisma.js';

async function main() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected');

    app.listen(config.port, () => {
      console.log(`🚀 Server running on http://localhost:${config.port}`);
      console.log(`📝 Environment: ${config.nodeEnv}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();