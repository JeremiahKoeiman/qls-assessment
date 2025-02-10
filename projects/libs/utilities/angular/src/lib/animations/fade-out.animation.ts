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

const fadeOut = (): AnimationMetadata =>
  animation([
    animate(
      '{{duration}}ms {{delay}}ms',
      keyframes([style({ opacity: 1, easing: 'ease', offset: 0 }), style({ opacity: 0, easing: 'ease', offset: 1 })])
    )
  ]);

const DEFAULT_DURATION = 150;

export function fadeOutOnLeaveAnimation(): AnimationTriggerMetadata {
  return trigger('fadeOutOnLeave', [
    transition(':leave', [fadeOut()], {
      params: {
        delay: 0,
        duration: DEFAULT_DURATION
      }
    })
  ]);
}
