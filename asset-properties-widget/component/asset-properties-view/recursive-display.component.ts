import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recursive-display',
  template: `
    <!-- Check if the value is primitive (like string, number, etc.); if it is, display it directly -->
    <ng-container *ngIf="isPrimitive(value); else complexValue">
        <ng-container *ngIf="value != null && value !== ''; else noDataPrimitive">
            {{ value }}
        </ng-container>
    </ng-container>

    <!-- Display "No data" for null or empty primitive values -->
    <ng-template #noDataPrimitive>
      <div>No data</div>
    </ng-template>
    
    <!-- Define a template for complex values (like objects or arrays) -->
    <ng-template #complexValue>
      <div *ngIf="isArray(value)">
          <!-- Display "No data" if the array is empty -->
          <ng-container *ngIf="value.length > 0; else noDataArray">
            <ul>
              <!-- For each element in the array, recursively display it using this component -->
              <li *ngFor="let item of value">
                <app-recursive-display [value]="item"></app-recursive-display>
              </li>
            </ul>
          </ng-container>
      </div>

      <ng-template #noDataArray>
          <div class="alert alert-info text-center">
              {{ "No Data" | translate }}
          </div>
      </ng-template>

      <!-- If the value is an object, iterate over its properties -->
      <div *ngIf="isObject(value)">
        <div class="small m-b-0 m-r-8 text-truncate" *ngFor="let key of objectKeys(value)">
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
