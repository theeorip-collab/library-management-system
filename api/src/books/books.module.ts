
import { Module } from '@nestjs/common';
import { BooksController } from './books.controller.js';
import { BooksService } from './books.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';

@Module({
  controllers: [BooksController],
  providers: [BooksService, JwtAuthGuard, RolesGuard],
  exports: [BooksService],
})
export class BooksModule {}
