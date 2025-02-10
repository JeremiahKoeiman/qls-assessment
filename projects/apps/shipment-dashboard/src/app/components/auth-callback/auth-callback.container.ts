import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'zookeeper-auth-callback',
  templateUrl: './auth-callback.container.html',
  styleUrls: ['./auth-callback.container.html'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthCallbackContainer {}
