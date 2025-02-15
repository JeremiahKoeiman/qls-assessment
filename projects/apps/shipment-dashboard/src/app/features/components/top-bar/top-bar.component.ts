import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { provideIcons } from '@ng-icons/core';
import { heroBars3 } from '@ng-icons/heroicons/outline';
import { IconButtonComponent } from '@qls/components/icon-button';

@Component({
  standalone: true,
  selector: 'sd-top-bar',
  templateUrl: './top-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, IconButtonComponent, TranslocoPipe],
  viewProviders: [provideIcons({ heroBars3 })]
})
export class TopBarComponent {
  /**
   * When the hamburger is clicked, the event is emitted
   */
  @Output() public qlsClick = new EventEmitter<void>();
}
