import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'sd-root',
  templateUrl: './app.component.html',
  imports: [CommonModule, RouterModule]
})
export class AppComponent {}
