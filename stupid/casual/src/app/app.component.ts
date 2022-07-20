import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0)' })),
      state('rotated', style({ transform: 'rotate(-180deg)' })),
      transition('rotated => default', animate('1500ms ease-out')),
      transition('default => rotated', animate('400ms ease-in')),
    ]),
  ],
})
export class AppComponent implements AfterViewInit {
  title = 'casual';

  state: string = 'default';
  rotate() {
    this.state = this.state === 'default' ? 'rotated' : 'default';
  }

  ngAfterViewInit(): void {
    this.rotate();
  }
}
