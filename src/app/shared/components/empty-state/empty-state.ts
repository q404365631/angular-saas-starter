import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-empty-state',
  imports: [ButtonModule],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.scss',
})
export class EmptyState {
  readonly icon = input<string>('pi pi-inbox');
  readonly title = input<string>('Nothing here yet');
  readonly description = input<string>('');
  readonly actionLabel = input<string | null>(null);
  readonly actionIcon = input<string | null>(null);

  readonly action = output<void>();

  protected onAction(): void {
    this.action.emit();
  }
}
