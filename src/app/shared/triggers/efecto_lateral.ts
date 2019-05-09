import {
  trigger,
  transition,
  query,
  style,
  group,
  animate
} from '@angular/animations'

export const efecto = trigger( 'routeAnimations', [
      transition('* <=> *', [
        query(
          ':enter',
          style({ transform: 'translateX(100%)', display: 'none' }),
          { optional: true }
        ),
        query(
          ':enter, :leave',
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'none'
          }),
          { optional: true }
        ),
        group([
          query(
            ':enter',
            [
              style({ transform: 'translateX(100%)', display: 'none' }),
              animate(
                '0.5s ease-in-out',
                style({ transform: 'translateX(0%)' })
              )
            ],
            { optional: true }
          ),
          query(
            ':leave',
            [
              style({ transform: 'translateX(0%)', display: 'none' }),
              animate(
                '0.5s ease-in-out',
                style({ transform: 'translateX(-100%)' })
              )
            ],
            { optional: true }
          )
        ])
      ])
    ])
