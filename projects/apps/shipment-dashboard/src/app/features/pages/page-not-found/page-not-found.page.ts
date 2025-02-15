import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'sd-page-not-found',
  templateUrl: './page-not-found.page.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageNotFoundComponent {}
