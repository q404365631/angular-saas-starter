import { ErrorHandler, Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  private readonly toast = inject(MessageService);

  handleError(error: unknown): void {
    console.error('[AppErrorHandler]', error);
    const message = this.extractMessage(error);
    this.toast.add({
      severity: 'error',
      summary: 'Unexpected error',
      detail: message,
      life: 6000,
    });
  }

  private extractMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (typeof error === 'string') return error;
    try {
      return JSON.stringify(error);
    } catch {
      return 'An unexpected error occurred.';
    }
  }
}
