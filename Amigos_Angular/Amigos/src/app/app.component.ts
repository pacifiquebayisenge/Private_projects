import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReminderComponent } from './dialog/reminder.component';
import { GloVarService } from './services/glo-var.service'
import { BehaviorSubject } from 'rxjs';
import { PwaService } from './services/pwa.service';
import * as firebase from 'firebase';
import { Meta } from "@angular/platform-browser";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {






  constructor(
    public gloVarService: GloVarService,
    private pwaService: PwaService,
    private meta: Meta

  ) {
    this.pwaService.checkUpdates()
  }

  ngOnInit() {

    this.meta.updateTag({
      name: 'theme-color',
      content: 'rgb(252, 186, 3)'
    });

    if (this.gloVarService.isDarkTheme) {
      document.querySelector('body').style.backgroundImage = "linear-gradient(to top, #350141, #350141)"
    }
    else {
      document.querySelector('body').style.backgroundImage = "linear-gradient(to top, #3f3f50, #3f3f50)"

    }



    this.gloVarService.darkBody.asObservable().subscribe(() => {
      if (this.gloVarService.isDarkTheme) {
        document.querySelector('body').style.backgroundColor = "linear-gradient(to top, #350141, #350141)"
      }
      else {
        document.querySelector('body').style.backgroundImage = "linear-gradient(to top, #3f3f50, #3f3f50)"

      }
    })



  }

  ngOnChanges(changes: SimpleChanges) {

    console.log(changes.s)

  }




}


