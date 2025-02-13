import { Directive, HostListener, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { notUndefined } from '@qls/utilities/core';

import { Subject, distinctUntilChanged, filter, fromEvent, merge, switchMap } from 'rxjs';

import { BaseOverlayTrigger, TriggerConfig } from './base-trigger';

@Directive({
  selector: '[triggerOverlayOnHover]',
  standalone: true
})
export class TriggerOverlayOnHoverDirective extends BaseOverlayTrigger implements OnInit, OnDestroy {
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

  private readonly hoverStateTriggerSubject = new Subject<boolean>();
  private readonly hoverStateTargetSubject = new Subject<boolean>();

  @HostListener('mouseenter') public onMouseEnter(): void {
    this.hoverStateTriggerSubject.next(true);
  }

  @HostListener('mouseleave') public onMouseLeave(): void {
    this.hoverStateTriggerSubject.next(false);
  }

  public ngOnInit(): void {
    this.attachOrDetachOverlayRefOnOverlayRefChange();
    this.closeOnOutsidePointerEvents();
    this.closeOnClickHostAgain();
    this.setHoverStateTargetOnMouseEnter();
    this.setHoverStateTargetOnMouseLeave();
    this.triggerOpenStateOnHoverChanges();
  }

  public ngOnDestroy(): void {
    this.triggerOpenStateSubject.next(false);
    this.subscription.unsubscribe();
  }

  /**
   * when the mouse enters the attached element, set the hover state to true
   */
  private setHoverStateTargetOnMouseEnter(): void {
    this.subscription.add(
      this.overlayRef$
        .pipe(
          filter(notUndefined),
          switchMap(overlayRef => fromEvent(overlayRef.overlayElement, 'mouseenter'))
        )
        .subscribe(() => {
          this.hoverStateTargetSubject.next(true);
        })
    );
  }

  /**
   * when the mouse leaves the attached element, set the hover state to false
   */
  private setHoverStateTargetOnMouseLeave(): void {
    this.subscription.add(
      this.overlayRef$
        .pipe(
          filter(notUndefined),
          switchMap(overlayRef => fromEvent(overlayRef.overlayElement, 'mouseleave'))
        )
        .subscribe(() => {
          this.hoverStateTargetSubject.next(false);
        })
    );
  }

  /**
   * Trigger open state on hover changes
   */
  private triggerOpenStateOnHoverChanges(): void {
    this.subscription.add(
      merge(this.hoverStateTriggerSubject, this.hoverStateTargetSubject)
        .pipe(distinctUntilChanged())
        .subscribe(state => {
          this.triggerOpenStateSubject.next(state);
        })
    );
  }
}
