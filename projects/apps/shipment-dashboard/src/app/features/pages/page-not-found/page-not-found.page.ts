import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  standalone: true,
  selector: 'sd-page-not-found',
  templateUrl: './page-not-found.page.html',
  imports: [CommonModule, TranslocoPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {}
