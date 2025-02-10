import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sh-overview',
  templateUrl: './overview.component.html',
  imports: [CommonModule]
})
export class OverviewComponent {}
