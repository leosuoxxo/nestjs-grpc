import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { BookModule } from './book/book.module';

@Module({
  imports: [BookModule],
  controllers: [ApiGatewayController],
  providers: [],
})
export class ApiGatewayModule {}
