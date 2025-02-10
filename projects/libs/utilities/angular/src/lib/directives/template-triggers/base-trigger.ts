import { CdkOverlayOrigin, ConnectedPosition, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { notUndefined } from '@qls/utilities/core';
import { Memoize } from '@qls/utilities/reactive';

import {
  Observable,
  Subject,
  Subscription,
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  shareReplay,
  startWith,
  switchMap,
  withLatestFrom
} from 'rxjs';

export type TriggerConfig = Omit<OverlayConfig, 'direction' | 'scrollStrategy' | 'positionStrategy'>;

const overlayPositions: ConnectedPosition[] = [
  {
    originX: 'start',
    overlayX: 'start',
    originY: 'bottom',
    overlayY: 'top',
    offsetY: 4
  },
  {
    originX: 'end',
    overlayX: 'end',
    originY: 'bottom',
    overlayY: 'top',
    offsetY: 4
  },
  {
    originX: 'start',
    overlayX: 'start',
    originY: 'top',
    overlayY: 'bottom',
    offsetY: -4
  },
  {
    originX: 'end',
    overlayX: 'end',
    originY: 'top',
    overlayY: 'bottom',
    offsetY: -4
  }
];

export abstract class BaseOverlayTrigger extends CdkOverlayOrigin {
  /**
   * The element that the needs to be triggered for
   */
  protected abstract triggerFor: TemplateRef<unknown>;

  /**
   * The configuration for the overlay
   */
  protected triggerConfig: TriggerConfig = {
    disposeOnNavigation: true
  };

  protected readonly triggerOpenStateSubject = new Subject<boolean>();
  protected readonly subscription = new Subscription();

  private readonly overlayService = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);

  /**
   * Attach or detach template ref
   */
  protected attachOrDetachOverlayRefOnOverlayRefChange(): void {
    this.subscription.add(
      this.overlayRef$.pipe(pairwise()).subscribe(([previousOverlayRef, currentOverlayRef]) => {
        // If current overlayRef is set: attach it
        if (currentOverlayRef) {
          this.attachOverlayRef(currentOverlayRef);
          return;
        }
        // If current overlayRef is not set: detach previous overlayref
        if (previousOverlayRef && !currentOverlayRef) {
          this.detachOverlayRef(previousOverlayRef);
        }
      })
    );
  }

  /**
   * Close overlay on click outside overlay
   */
  protected closeOnOutsidePointerEvents(): void {
    this.subscription.add(
      this.overlayRef$
        .pipe(
          filter(notUndefined),
          switchMap(overlayRef => overlayRef.outsidePointerEvents()),
          filter(({ type, target }) => {
            // If the click target is not inside the element and not the element itself
            const clickTarget = target as HTMLElement;
            return type === 'click' && !this.elementRef.nativeElement.contains(clickTarget);
          })
        )
        .subscribe(() => {
          this.triggerOpenStateSubject.next(false);
        })
    );
  }

  /**
   * Close overlay when clicking on the host again
   */
  protected closeOnClickHostAgain(): void {
    this.subscription.add(
      this.triggerOpenStateSubject
        .pipe(
          pairwise(),
          filter(([previous, current]) => previous && current),
          withLatestFrom(this.overlayRef$),
          filter(([, overlayRef]) => !!overlayRef)
        )
        .subscribe(() => {
          this.triggerOpenStateSubject.next(false);
        })
    );
  }

  @Memoize protected get overlayRef$(): Observable<OverlayRef | undefined> {
    return this.triggerOpenStateSubject.pipe(
      distinctUntilChanged(),
      map(open => (open ? this.createOverlay() : undefined)),
      startWith(undefined),
      shareReplay(1)
    );
  }

  private createOverlay(): OverlayRef {
    return this.overlayService.create({
      positionStrategy: this.overlayService.position().flexibleConnectedTo(this.elementRef).withPositions(overlayPositions),
      ...this.triggerConfig
    });
  }

  private attachOverlayRef(overlayRef: OverlayRef): void {
    if (!overlayRef.hasAttached()) {
      const templatePortal = new TemplatePortal(this.triggerFor, this.viewContainerRef);
      overlayRef.attach(templatePortal);
    }
  }

  private detachOverlayRef(overlayRef: OverlayRef): void {
    overlayRef.detach();
  }
}
