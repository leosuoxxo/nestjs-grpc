import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { resolve } from 'path';
import { BookModule } from './book.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(BookModule, {
    transport: Transport.GRPC,
    options: {
      url: '0.0.0.0:50051',
      protoPath: resolve(__dirname, '../../../grpc-proto/proto/book.proto'),
      package: 'book',
    },
  });

  // tslint:disable-next-line: no-console
  app.listen();
}
bootstrap();
