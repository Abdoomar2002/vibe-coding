import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): { message: string; timestamp: string; version: string } {
    this.logger.log('Health check endpoint called');
    return {
      message: this.appService.getHello(),
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
  }

  @Get('health')
  getHealth(): { status: string; timestamp: string; uptime: number } {
    this.logger.log('Health check endpoint called');
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }

  @Get('api-info')
  getApiInfo(): { 
    name: string; 
    version: string; 
    description: string; 
    endpoints: string[];
    features: string[];
  } {
    return {
      name: 'Vibe Coding API',
      version: '1.0.0',
      description: 'AI-powered website section generator API',
      endpoints: [
        'POST /api/v1/sections - Create new section',
        'GET /api/v1/sections - Get all sections with pagination',
        'GET /api/v1/sections/:id - Get section by ID',
        'GET /api/v1/sections/search/:query - Search sections',
        'GET /api/v1/sections/stats/overview - Get statistics',
      ],
      features: [
        'AI-powered section generation',
        'Contextual website type analysis',
        'MongoDB integration',
        'RESTful API design',
        'Input validation',
        'Error handling',
        'Logging',
        'CORS support',
      ],
    };
  }
}
