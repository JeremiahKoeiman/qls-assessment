import { CdkScrollable } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'qls-card-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './card-content.component.html',
  imports: [CommonModule, CdkScrollable]
})
export class CardContentComponent {}
