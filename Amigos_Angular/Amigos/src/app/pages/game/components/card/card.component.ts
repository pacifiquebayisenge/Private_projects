import { Component, Input } from '@angular/core';

import { GloVarService } from 'src/app/services/glo-var.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() text: string

  constructor(public gloVarService: GloVarService) { }



}
