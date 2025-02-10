import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'zookeeper-logout',
  templateUrl: './logout.container.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutContainer {}
