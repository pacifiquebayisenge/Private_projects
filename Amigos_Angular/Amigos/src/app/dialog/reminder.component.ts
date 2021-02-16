import { Component } from '@angular/core';
import { GloVarService } from '../services/glo-var.service';

@Component({
    selector: 'app-root',
    templateUrl: 'reminder.component.html',
    styleUrls: ['reminder.component.css']

})
export class ReminderComponent {

    constructor(
        public gloVarService: GloVarService
    ) { }

}