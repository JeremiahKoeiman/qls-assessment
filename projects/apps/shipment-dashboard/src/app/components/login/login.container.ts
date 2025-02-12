import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';
import { ButtonComponent } from '@qls/components/button';
import { Memoize } from '@qls/utilities/reactive';
import { observeProperty } from '@qls/utilities/rxjs';

import { Observable, Subject, Subscription, map, shareReplay, switchMap, withLatestFrom } from 'rxjs';

import { AuthenticationService } from '#sd/app/core/domain/authentication/authentication.service';
import { Login } from '#sd/app/core/domain/authentication/models/login.model';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  standalone: true,
  selector: 'sd-login',
  templateUrl: './login.container.html',
  imports: [CommonModule, TranslocoPipe, ButtonComponent, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginContainer implements OnInit {
  public formGroup: FormGroup<LoginForm> = new FormGroup({
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required])
  });

  private readonly authenticationService = inject(AuthenticationService);

  private readonly loginTriggerSubject = new Subject<void>();
  private readonly subscription = new Subscription();

  public ngOnInit(): void {
    this.loginUserOnTrigger();
  }

  public login(): void {
    if (!this.formGroup.valid) {
      return;
    }

    this.loginTriggerSubject.next();
  }

  // TODO: catch & display error
  private loginUserOnTrigger(): void {
    this.subscription.add(
      this.loginTriggerSubject
        .pipe(
          withLatestFrom(this.formGroup$),
          map(([, formGroup]) => this.mapLoginFormGroupToLoginValue(formGroup)),
          switchMap(credentials => this.authenticationService.login(credentials))
        )
        .subscribe()
    );
  }

  private mapLoginFormGroupToLoginValue(formGroup: FormGroup<LoginForm>): Login {
    return {
      email: formGroup.controls.email.value,
      password: formGroup.controls.password.value
    } satisfies Login;
  }

  @Memoize private get formGroup$(): Observable<FormGroup<LoginForm>> {
    return observeProperty(this as LoginContainer, 'formGroup').pipe(shareReplay(1));
  }
}
