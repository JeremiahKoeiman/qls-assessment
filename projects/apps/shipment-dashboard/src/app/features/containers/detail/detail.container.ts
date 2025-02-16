import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'sh-detail',
  templateUrl: './detail.container.html',
  imports: [CommonModule, RouterModule]
})
export class DetailComponent {
  private readonly router = inject(Router);

  public navigate(): void {
    this.router.navigate(['/shipments']);
  }
}
