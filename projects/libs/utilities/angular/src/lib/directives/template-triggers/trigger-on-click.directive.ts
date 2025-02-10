import { Directive, HostListener, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';

import { BaseOverlayTrigger, TriggerConfig } from './base-trigger';

@Directive({
  selector: '[triggerOverlayOnClick]',
  standalone: true
})
export class TriggerOverlayOnClickDirective extends BaseOverlayTrigger implements OnInit, OnDestroy {
  /**
   * The element that the list needs to be triggered for
   */
  @Input({ required: true }) public override triggerFor!: TemplateRef<unknown>;

  /**
   * The configuration for the overlay
   */
  @Input() protected override triggerConfig: TriggerConfig = {
    disposeOnNavigation: true
  };

  public ngOnInit(): void {
    this.attachOrDetachOverlayRefOnOverlayRefChange();
    this.closeOnOutsidePointerEvents();
    this.closeOnClickHostAgain();
  }

  public ngOnDestroy(): void {
    this.triggerOpenStateSubject.next(false);
    this.subscription.unsubscribe();
  }

  @HostListener('click') public onClick(): void {
    this.triggerOpenStateSubject.next(true);
  }
}
