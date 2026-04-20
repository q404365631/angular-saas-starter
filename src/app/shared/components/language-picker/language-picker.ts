import { Component, inject, model } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { LANG_OPTIONS, LanguageService, SupportedLang } from '../../../core/i18n/language.service';

@Component({
  selector: 'app-language-picker',
  imports: [DialogModule, ButtonModule, TranslatePipe],
  templateUrl: './language-picker.html',
  styleUrl: './language-picker.scss',
})
export class LanguagePicker {
  private readonly lang = inject(LanguageService);

  readonly visible = model(false);

  protected readonly options = LANG_OPTIONS;
  protected readonly current = this.lang.current;

  protected select(code: SupportedLang): void {
    this.lang.set(code);
    this.visible.set(false);
  }
}
