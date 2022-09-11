import {
  getBooksRequest,
  getBooksResponse,
  Book,
  getBookByIdResponse,
  createBookResponse,
} from '../../../grpc-proto/build/proto/book.pb';
import { Controller, Get, Post } from '@nestjs/common';
import { BookService } from './book.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @GrpcMethod('BookService', 'createBook')
  @Post()
  async createBook(createBooksRequest): Promise<createBookResponse> {
    return { books: await this.bookService.createBook(createBooksRequest) };
  }

  @GrpcMethod('BookService', 'getBooks')
  @Get()
  async getBooks(getBooksRequest): Promise<getBooksResponse> {
    console.log({
      getBooksRequest,
    });
    return { books: await this.bookService.getBooks() };
  }

  @GrpcMethod('BookService', 'getBookById')
  @Get(':id')
  async getBookById(id: number): Promise<getBookByIdResponse> {
    return { book: await this.bookService.getBookById(id) };
  }
}
