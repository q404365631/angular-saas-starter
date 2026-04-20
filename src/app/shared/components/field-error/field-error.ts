import { Component, computed, inject, input } from '@angular/core';
import { AbstractControl, FormGroupDirective, NgForm, ValidationErrors } from '@angular/forms';

const DEFAULT_MESSAGES: Record<string, (err: unknown) => string> = {
  required: () => 'This field is required.',
  email: () => 'Enter a valid email address.',
  minlength: (e) => {
    const err = e as { requiredLength: number };
    return `Minimum ${err.requiredLength} characters required.`;
  },
  maxlength: (e) => {
    const err = e as { requiredLength: number };
    return `Maximum ${err.requiredLength} characters allowed.`;
  },
  pattern: () => 'Invalid format.',
  min: (e) => {
    const err = e as { min: number };
    return `Must be at least ${err.min}.`;
  },
  max: (e) => {
    const err = e as { max: number };
    return `Must be at most ${err.max}.`;
  },
  server: (e) => String(e),
};

@Component({
  selector: 'app-field-error',
  imports: [],
  templateUrl: './field-error.html',
  styleUrl: './field-error.scss',
})
export class FieldError {
  readonly control = input.required<AbstractControl | null>();
  readonly messages = input<Record<string, (err: unknown) => string>>({});

  private readonly parent = inject(FormGroupDirective, { optional: true });
  private readonly form = inject(NgForm, { optional: true });

  protected readonly message = computed(() => this.resolveMessage());

  private resolveMessage(): string | null {
    const ctl = this.control();
    if (!ctl || !ctl.errors) return null;
    if (!ctl.touched && !(this.parent?.submitted || this.form?.submitted)) {
      return null;
    }
    return this.firstMessage(ctl.errors);
  }

  private firstMessage(errors: ValidationErrors): string | null {
    const custom = this.messages();
    for (const key of Object.keys(errors)) {
      const msg = custom[key] ?? DEFAULT_MESSAGES[key];
      if (msg) return msg(errors[key]);
    }
    return 'Invalid value.';
  }
}
