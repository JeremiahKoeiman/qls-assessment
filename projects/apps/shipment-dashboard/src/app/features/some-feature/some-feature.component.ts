import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'oss-some-feature',
  styleUrl: './some-feature.component.scss',
  templateUrl: 'some-feature.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SomeFeatureComponent {}
