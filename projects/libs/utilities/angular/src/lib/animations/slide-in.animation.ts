import { AnimationMetadata, AnimationTriggerMetadata, animate, animation, style, transition, trigger } from '@angular/animations';

animations: [
  trigger('alertAnimation', [
    transition(':enter', [style({ margin: '{{margin}}', transform: 'translateX({{transformOperator}}200%)' }), animate('0.3s ease-out')], {
      params: { margin: '-40px 0 0 0', transformOperator: '-' }
    })
  ])
];

const slideIn = (): AnimationMetadata =>
  animation([style({ margin: '{{margin}}', transform: 'translateX({{transformOperator}}200%)' }), animate('0.3s ease-out')]);

export function slideInOnEnterAnimation(): AnimationTriggerMetadata {
  return trigger('slideInOnEnter', [
    transition(':enter', [slideIn()], {
      delay: 200,
      params: { transformOperator: '-' }
    })
  ]);
}
