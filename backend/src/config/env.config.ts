import { registerAs } from '@nestjs/config';

export interface DatabaseConfig {
  uri: string;
  name: string;
}

export interface AppConfig {
  port: number;
  nodeEnv: string;
  corsOrigins: string[];
}

export interface Config {
  app: AppConfig;
  database: DatabaseConfig;
}

export default registerAs('config', (): Config => ({
  app: {
    port: parseInt(process.env.PORT || '4000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  },
  database: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/vibechallenge',
    name: process.env.MONGODB_NAME || 'vibechallenge',
  },
})); 