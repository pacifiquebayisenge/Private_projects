import { Component, OnInit, Input } from '@angular/core';

import { trigger, keyframes, animate, transition } from '@angular/animations';
import * as kf from './keyframes';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() text: string

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
