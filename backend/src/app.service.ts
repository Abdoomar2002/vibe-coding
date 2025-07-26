import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    this.logger.log('getHello method called');
    return 'Welcome to Vibe Coding API! 🚀';
  }

  getSystemInfo(): { 
    nodeVersion: string; 
    platform: string; 
    memory: { used: number; total: number; free: number };
    uptime: number;
  } {
    const memUsage = process.memoryUsage();
    return {
      nodeVersion: process.version,
      platform: process.platform,
      memory: {
        used: Math.round(memUsage.heapUsed / 1024 / 1024),
        total: Math.round(memUsage.heapTotal / 1024 / 1024),
        free: Math.round((memUsage.heapTotal - memUsage.heapUsed) / 1024 / 1024),
      },
      uptime: process.uptime(),
    };
  }
}
