import { AnimationMetadata, AnimationTriggerMetadata, animate, animation, style, transition, trigger } from '@angular/animations';

const slideOut = (): AnimationMetadata =>
  animation([animate('0.3s ease-in'), style({ transform: 'translateX({{transformOperator}}200%)' })]);

export function slideOutOnLeaveAnimation(): AnimationTriggerMetadata {
  return trigger('slideOutOnLeave', [
    transition(':leave', [slideOut()], {
      delay: 200,
      params: { transformOperator: '-' }
    })
  ]);
}
