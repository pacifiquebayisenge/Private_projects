import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GloVarService } from 'src/app/services/glo-var.service';
import { ReminderComponent } from 'src/app/dialog/reminder.component';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { PwaService } from 'src/app/services/pwa.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  constructor(
    public dialog: MatDialog,
    public gloVarService: GloVarService,
    private db: AngularFirestore,
    private pwaService: PwaService,
    private _snackBar: MatSnackBar,
  ) { }

  title = 'A M I G O S';

  ngOnInit() {
    this.gloVarService.homePage.next(true);
  }


  tapCount = 0;
  trippleTap() {

    if (this.tapCount > 14) {
      console.log('admin');
      this.tapCount = 0;
    }

    this.tapCount++;





  }

  admin() {
    console.log("ADMIN")
  }



  openDialog() {




    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '50%'
    this.dialog.open(ReminderComponent, dialogConfig);

  }

  darkmode() {
    document.querySelector('body').style.backgroundImage = ""
    if (!this.gloVarService.isDarkTheme) {
      document.querySelector('body').style.backgroundColor = "rgb(53, 1, 65)"
    } else {
      document.querySelector('body').style.backgroundColor = "#3f3f50"
    }
  }





  dbb = firebase.default.firestore()

  async loadData() {

    if (this.gloVarService.txtList.length === 0) {

      this.dbb.enableNetwork()
        .then(() => {

          this.getText()


        })

      return;
    }
    this.gloVarService.txtList = []

    this.dbb.disableNetwork()
      .then(() => {


        this.getText()
      })
  }

  private getText() {

    this.dbb.collection("text")
      .onSnapshot({ includeMetadataChanges: true }, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {

            this.gloVarService.txtList.push(change.doc.data());
          }

          var source = snapshot.metadata.fromCache ? "local cache" : "server";
          console.log("Data came from " + source);

        });
      });

  }
}
