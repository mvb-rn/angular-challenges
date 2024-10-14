import { Component, OnInit, signal } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      color="blue"
      (add)="onAdd()"
      imgSrc="assets/img/student.webp">
      <ng-template #listItem let-city="item">
        <app-list-item
          (delete)="onDelete(city.id)"
          [name]="city.name"
          [id]="city.id"></app-list-item>
      </ng-template>
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities = signal<City[]>([]);

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.cities = this.store.cities;
    this.http.fetchCities$.subscribe((s) => this.store.addAll(s));
  }

  onDelete(id: number) {
    this.store.deleteOne(id);
  }

  onAdd() {
    this.store.addOne(randomCity());
  }
}
