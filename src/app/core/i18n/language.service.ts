import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const LANG_STORAGE_KEY = 'app:lang';
export const SUPPORTED_LANGS = ['en', 'tr', 'es', 'uk'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export interface LangOption {
  code: SupportedLang;
  label: string;
  flag: string;
}

export const LANG_OPTIONS: LangOption[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
];

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);

  readonly current = signal<SupportedLang>(
    (this.translate.currentLang as SupportedLang) ?? 'en',
  );

  set(lang: SupportedLang): void {
    this.translate.use(lang);
    this.current.set(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // storage unavailable — ignore
    }
  }
}
