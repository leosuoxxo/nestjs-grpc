import {
  getBooksResponse,
  Book,
} from '../../../grpc-proto/build/proto/book.pb';
import { Injectable, HttpException } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { BOOKS } from './books.mock';

@Injectable()
export class BookService {
  books = BOOKS;


  createBook(createBooksRequest) {

    const { id, title, description, author } = createBooksRequest;

    this.books = [
      ...this.books,
      {
        id,
        title,
        description,
        author,
      }
    ]

    return this.books
  }

  getBooks(): Promise<Book[]> {
    return new Promise((resolve) => {
      resolve(this.books);
    });
  }

  getBookById(param): Promise<Book> {
    console.log(param);
    return new Promise((resolve) => {
      const book = this.books.find(($book) => $book.id === param.id);
      if (!book) {
        throw new HttpException('Book does not exist!', 404);
      }
      resolve(book);
    });
  }
}
