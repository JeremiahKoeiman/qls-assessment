import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroBars3 } from '@ng-icons/heroicons/outline';
import { IconComponent } from '@qls/components/icon';

@Component({
  standalone: true,
  selector: 'sd-wrapper',
  templateUrl: './app-wrapper.component.html',
  imports: [CommonModule, RouterModule, IconComponent],
  viewProviders: [provideIcons({ heroBars3 })]
})
export class AppWrapperComponent {}
