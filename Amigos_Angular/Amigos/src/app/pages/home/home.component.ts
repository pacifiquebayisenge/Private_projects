import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GloVarService } from 'src/app/services/glo-var.service';
import { ReminderComponent } from 'src/app/dialog/reminder.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    public dialog: MatDialog,
    public gloVarService: GloVarService
  ) { }

  title = 'A M I G O S';

  openDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '50%'
    const dialogRef = this.dialog.open(ReminderComponent, dialogConfig);


  }

  darkmode() {
    document.querySelector('body').style.backgroundImage = ""
    if (!this.gloVarService.isDarkTheme) {
      document.querySelector('body').style.backgroundColor = "rgb(53, 1, 65)"
    } else {
      document.querySelector('body').style.backgroundColor = "#3f3f50"
    }
  }



}
