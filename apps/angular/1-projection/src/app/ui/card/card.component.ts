import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class.bg-light-green]="color === 'green'"
      [class.bg-light-red]="color === 'red'"
      [class.bg-light-blue]="color === 'blue'">
      <img [src]="imgSrc" width="200px" />

      <section>
        @for (item of list; track $index) {
          <ng-container
            *ngTemplateOutlet="listItem; context: { item }"></ng-container>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="add.emit()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  styles: `
    .bg-light-green {
      background-color: rgba(0, 250, 0, 0.1);
    }

    .bg-light-red {
      background-color: rgba(250, 0, 0, 0.1);
    }
    .bg-light-blue {
      background-color: rgba(0, 0, 250, 0.1);
    }
  `,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent<T> {
  @ContentChild('listItem', { read: TemplateRef })
  listItem!: TemplateRef<{ item: T }>;
  @Input() color?: 'green' | 'blue' | 'red';
  @Input() imgSrc?: string;
  @Input() list: T[] | null = null;
  @Input() customClass = '';
  @Output() add = new EventEmitter();
}
