import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'sd-side-bar',
  templateUrl: './side-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class SideBarComponent {
  /**
   * When the button is clicked, the event is emitted
   */
  @Output() public qlsClick = new EventEmitter<void>();
}
