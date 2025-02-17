import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'qls-card-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-header.component.html',
  imports: [CommonModule]
})
export class CardHeaderComponent {
  /**
   * The heading for the card header
   */
  @Input({ required: true }) heading: string;
}
