import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { LoadingService } from './core/services/loading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, ConfirmDialogModule, ProgressBarModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly loading = inject(LoadingService);
}
