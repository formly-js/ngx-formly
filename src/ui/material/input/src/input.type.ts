import { Component, ChangeDetectionStrategy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { FieldType } from '@ngx-formly/material/form-field';

@Component({
  selector: 'formly-field-mat-input',
  template: `
    <input
      *ngIf="type !== 'number'; else numberTmp"
      matInput
      [id]="id"
      [type]="type || 'text'"
      [readonly]="to.readonly"
      [required]="to.required"
      [errorStateMatcher]="errorStateMatcher"
      [formControl]="formControl"
      [formlyAttributes]="field"
      [tabIndex]="to.tabindex"
      [placeholder]="to.placeholder"
    />
    <ng-template #numberTmp>
      <input
        matInput
        [id]="id"
        type="number"
        [readonly]="to.readonly"
        [required]="to.required"
        [errorStateMatcher]="errorStateMatcher"
        [formControl]="formControl"
        [formlyAttributes]="field"
        [tabIndex]="to.tabindex"
        [placeholder]="to.placeholder"
      />
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormlyFieldInput extends FieldType implements OnInit, AfterViewInit {
  @ViewChild(MatInput) matInput!: MatInput;

  get type() {
    return this.to.type || 'text';
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this.formFieldControl = this.matInput;
  }
}
