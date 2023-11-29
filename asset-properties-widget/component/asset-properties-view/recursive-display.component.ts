import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recursive-display',
  template: `
    <!-- Check if the value is primitive (like string, number, etc.); if it is, display it directly -->
    <ng-container *ngIf="isPrimitive(value); else complexValue">
      {{ value }}
    </ng-container>
    <!-- Define a template for complex values (like objects or arrays) -->
    <ng-template #complexValue>
      <div *ngIf="isArray(value)">
        <ul>
          <!-- For each element in the array, recursively display it using the same component -->
          <li *ngFor="let item of value">
            <app-recursive-display [value]="item"></app-recursive-display>
          </li>
        </ul>
      </div>
      <!-- If the value is an object, iterate over its properties -->
      <div *ngIf="isObject(value)">
        <div *ngFor="let key of objectKeys(value)">
          <!-- Display the key and then recursively display its value -->
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
