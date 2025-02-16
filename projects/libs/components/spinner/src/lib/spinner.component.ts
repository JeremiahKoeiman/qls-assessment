import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'qls-spinner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './spinner.component.html',
  imports: [CommonModule, MatProgressSpinnerModule]
})
export class SpinnerComponent {}
