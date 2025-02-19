import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { ButtonComponent } from '@qls/components/button';
import { Radio, RadioGroupComponent } from '@qls/components/radio-group';
import { Memoize } from '@qls/utilities/reactive';

import { Observable, combineLatest, map } from 'rxjs';

import { Languages, languageSettingLocalStorageKey, languages } from '#sd/app/core/utilities/constants';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sd-settings',
  templateUrl: './settings.container.html',
  imports: [CommonModule, ReactiveFormsModule, RadioGroupComponent, TranslocoPipe, ButtonComponent]
})
export class SettingsContainer implements OnInit {
  public formGroup = new FormGroup({
    language: new FormControl<Languages | null>(null)
  });

  private readonly translocoSevice = inject(TranslocoService);

  public ngOnInit(): void {
    this.formGroup.patchValue({
      language: this.translocoSevice.getActiveLang() as Languages
    });
  }

  public saveSettings(): void {
    const languageFormvalue = this.formGroup.controls.language.value;

    localStorage.setItem(languageSettingLocalStorageKey, languageFormvalue);

    this.translocoSevice.setActiveLang(languageFormvalue);
  }

  @Memoize public get radios$(): Observable<Radio<string>[]> {
    return combineLatest(
      languages.map(language =>
        this.translocoSevice
          .selectTranslate(`SETTINGS.LANGUAGE.${language.toUpperCase()}`)
          .pipe(map(label => ({ label, value: language })))
      )
    );
  }
}
