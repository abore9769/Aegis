import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Welcome to Pulsefy/Aegis API',
      version: 'v1',
      docs: '/api/docs',
      endpoints: {
        health: '/api/v1/health',
        aid: '/api/v1/aid',
        verification: '/api/v1/verification',
      },
    };
  }
}
