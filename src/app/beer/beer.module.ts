import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerComponent } from './beer.component';
import { BeerService } from './beer.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BeerComponent
  ],
  exports: [
    BeerComponent
  ],
  providers: [ BeerService ]
})
export class BeerModule {
}
