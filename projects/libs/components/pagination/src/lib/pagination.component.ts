import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'qls-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pagination.component.html',
  imports: [CommonModule, MatPaginatorModule]
})
export class PaginationComponent {
  /**
   * The length of the data set
   */
  @Input({ required: true }) public length: number;

  /**
   * The pageSize of the pagination
   */
  @Input({ required: true }) public pageSize: number;

  /**
   * Emits when the page changes
   */
  @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
}
