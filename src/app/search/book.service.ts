import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

/*
 今回はclass（DTO）を作らず、型定義だけ用意しました。
 型を与えるだけが目的であれば、これでも十分に動きます。

 classとinterfaceどちらを使うかについて、以下サイトがわかりやすい（英語ですが…）
 https://jameshenry.blog/typescript-classes-vs-interfaces/

 三行
 サーバや他所からのモデルデータ型を作成する場合、最初はinterfaceを勧める
 classと異なり、interfaceはコンパイル時に削除されるため、コンパイル後のサイズが軽くなる。
 interfaceからclassへの移行（リファクタリング）は簡単。
 */
export interface Book {
  authors: string;
  title: string;
  publisher: string;
  publishedDate: string;
  description: string;
  pageCount: number;
}

// Booksの初期値（file-scope static const）
const initialBooks: Array<Book> = [];
// Google Books API url
const url: string = 'https://www.googleapis.com/books/v1/volumes';

@Injectable()
export class BookService {

  constructor(private http: HttpClient) {
  }

  init(): Array<Book> {
    return initialBooks;
  }

  fetch(query: string): Observable<Array<Book>> {
    if (query === '') {
      // 例えば…ですがエラーの投げ方です
      return Observable.throw(new Error('A query is empty.'));
    }

    const params: HttpParams = new HttpParams().set('q', query);

    const observable: Observable<any> = this.http.get(url, {params: params});

    // 処理を別関数に移譲する場合、observableを渡して繋ぐ（ストリームの考え方）
    return this.getResponse(observable);
  }

  private getResponse(observable: Observable<any>): Observable<Array<Book>> {

    const splitAuthors: (authors: Array<string>) => string = (authors: Array<string>): string => {
      return authors.reduce((previous: string, current: string): string => {
        return previous + ' ' + current;
      });
    };

    return observable.pipe(
      map((res: any): Array<Book> => {
        const items: Array<any> = res.items;

        return items.map((value: any): Book => {
          const v: any = value.volumeInfo;
          return <Book>{
            // 型がany = null | undefinedかもしれないということ
            // つまり、nullチェックをキッチリ入れないとコード品質を担保できない too bad...
            // そして、カバレッジ100%という制約があると、単体テストは…
            // 型はキッチリ書こう
            authors: v.authors ? splitAuthors(v.authors) : '',
            title: v.title ? v.title : '',
            publisher: v.publisher ? v.publisher : '',
            publishedDate: v.publishedDate ? v.publishedDate : '',
            description: v.description ? v.description : '',
            pageCount: v.pageCount ? Number(v.pageCount) : 0
          };
        });
      })
    );
  }
}
