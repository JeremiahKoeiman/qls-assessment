import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'qls-card-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-footer.component.html',
  imports: [CommonModule]
})
export class CardFooterComponent {}
