import { Component, OnInit, Input } from '@angular/core';

import { trigger, keyframes, animate, transition } from '@angular/animations';
import * as kf from './keyframes';
import { GloVarService } from 'src/app/services/glo-var.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() text: string

  constructor(public gloVarService: GloVarService) { }

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
