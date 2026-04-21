import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly router = inject(Router);

  private readonly manualCount = signal(0);
  private readonly routerActive = signal(false);

  readonly isLoading = computed(() => this.routerActive() || this.manualCount() > 0);

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.routerActive.set(true);
      } else if (
        e instanceof NavigationEnd ||
        e instanceof NavigationCancel ||
        e instanceof NavigationError
      ) {
        this.routerActive.set(false);
      }
    });
  }

  show(): void {
    this.manualCount.update((n) => n + 1);
  }

  hide(): void {
    this.manualCount.update((n) => Math.max(0, n - 1));
  }
}
