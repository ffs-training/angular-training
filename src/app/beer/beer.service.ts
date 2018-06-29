import { Injectable } from '@angular/core';
import { Beer } from './beer.dto';

@Injectable()
export class BeerService {

  private _data: Array<Beer>;

  constructor() {
    this._data = [];
  }

  get Data(): Array<Beer> {
    return this._data;
  }

  add(name: string, description: string): void {
    const beer: Beer = new Beer(String(this._data.length + 1), name, description);
    this._data.push(beer);
  }
}
