import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recursive-display',
  template: `
    <ng-container *ngIf="isPrimitive(value); else complexValue">
      {{ value }}
    </ng-container>
    <ng-template #complexValue>
      <div *ngIf="isArray(value)">
        <ul>
          <li *ngFor="let item of value">
            <app-recursive-display [value]="item"></app-recursive-display>
          </li>
        </ul>
      </div>
      <div *ngIf="isObject(value)">
        <div *ngFor="let key of objectKeys(value)">
          {{ key }}:
          <app-recursive-display [value]="value[key]"></app-recursive-display>
        </div>
      </div>
    </ng-template>
  `,
})
export class RecursiveDisplayComponent {
  @Input() value: any;

  isArray(value: any): boolean {
    return Array.isArray(value);
  }

  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  isPrimitive(value: any): boolean {
    return !Array.isArray(value) && typeof value !== 'object';
  }

  objectKeys(value: object): string[] {
    return Object.keys(value);
  }
}
