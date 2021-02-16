import { keyframes, style } from '@angular/animations';


export const rotateOutUpRight = [
    style({ transform: 'scale3d(1.475, 1.475, 1.475) translate3d(-42px, 0, 0)', opacity: 1, offset: .4 }),
    style({ transform: 'scale(2.1) translate3d(500px, 0, 0)', opacity: 0, offset: 1 })
]

export const fadeOutBottomRight = [
    style({ transform: 'translate3d(0, 0, 0)', offset: 0 }),
    style({ transform: 'translate3d(150%, 150%, 0)', offset: 1 })
]

export const swing = [
    style({ transform: 'rotate3d(0, 0, 1, 15deg)', offset: .2 }),
    style({ transform: 'rotate3d(0, 0, 1, -10deg)', offset: .4 }),
    style({ transform: 'rotate3d(0, 0, 1, 5deg)', offset: .6 }),
    style({ transform: 'rotate3d(0, 0, 1, -5deg)', offset: .8 }),
    style({ transform: 'none', offset: 1 })
]

