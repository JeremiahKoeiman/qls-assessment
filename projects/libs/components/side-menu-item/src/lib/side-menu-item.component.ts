import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'qls-side-menu-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './side-menu-item.component.html',
  imports: [CommonModule, NgIcon]
})
export class SideMenuItemComponent {
  /**
   * The label of the side menu item
   */
  @Input({ required: true }) public label: string;

  /**
   * The icon of the side menu item
   */
  @Input({ required: true }) public icon: string;
}
