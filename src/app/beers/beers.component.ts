import { Component, OnInit } from '@angular/core';
import { Beer } from '../beer/beer.dto';
import { BeerService } from '../beer/beer.service';
import { Router } from '@angular/router';

interface Form {
  name: string;
  description: string;
}

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: [ './beers.component.css' ]
})
export class BeersComponent implements OnInit {

  public form: Form = {
    name: '',
    description: ''
  };

  public myFavoriteBeers: Array<Beer>;

  constructor(private beerService: BeerService, private router: Router) {
    this.myFavoriteBeers = this.beerService.Data;
  }

  ngOnInit(): void {
  }

  public onDone(_event: any): void {
    this.beerService.add(this.form.name, this.form.description);
  }

  public jumpToHome(): void {
    this.router.navigate(['/']);
  }
}
