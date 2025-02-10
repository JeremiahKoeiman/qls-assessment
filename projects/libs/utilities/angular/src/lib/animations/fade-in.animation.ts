import {
  AnimationMetadata,
  AnimationTriggerMetadata,
  animate,
  animation,
  keyframes,
  style,
  transition,
  trigger
} from '@angular/animations';

const fadeIn = (): AnimationMetadata =>
  animation([
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([style({ visibility: 'visible', opacity: 0, easing: 'ease', offset: 0 }), style({ opacity: 1, easing: 'ease', offset: 1 })])
    )
  ]);

const DEFAULT_DURATION = 150;

export function fadeInOnEnterAnimation(): AnimationTriggerMetadata {
  return trigger('fadeInOnEnter', [
    transition(':enter', [style({ visibility: 'hidden' }), fadeIn()], {
      params: {
        delay: 0,
        duration: DEFAULT_DURATION
      }
    })
  ]);
}
