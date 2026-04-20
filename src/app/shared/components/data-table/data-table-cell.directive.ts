import { Directive, TemplateRef, inject, input } from '@angular/core';

export interface DataTableCellContext {
  $implicit: unknown;
  row: Record<string, unknown>;
}

@Directive({
  selector: 'ng-template[appCell]',
})
export class DataTableCell {
  readonly appCell = input.required<string>();
  readonly template = inject(TemplateRef<DataTableCellContext>);
}
