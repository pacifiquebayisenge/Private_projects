import { Component, OnInit } from '@angular/core';

import { trigger, keyframes, animate, transition } from '@angular/animations';
import * as kf from './keyframes';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('cardAnimator', [
      transition('* => rotateOutUpRight', animate(500, keyframes(kf.rotateOutUpRight))),
    ])
  ]
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  animationState: string;

  startAnimation(state) {

    console.log(state)

    if (!this.animationState) {
      this.animationState = state;
    }

  }

  resetAnimation() {

    this.animationState = '';

  }

}
