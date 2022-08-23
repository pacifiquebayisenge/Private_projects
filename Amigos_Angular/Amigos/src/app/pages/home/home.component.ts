import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GloVarService } from 'src/app/services/glo-var.service';
import { ReminderComponent } from 'src/app/dialog/reminder.component';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { PwaService } from 'src/app/services/pwa.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public gloVarService: GloVarService,
    private db: AngularFirestore,
    private router: Router,
    private pwa: PwaService
  ) {}

  title = 'A M I G O S';

  ngOnInit() {
    this.gloVarService.homePage.next(true);
  }

  tapCount = 0;
  trippleTap() {
    this.update();
    if (this.tapCount > 14) {
      this.router.navigate(['/splash']);
      this.tapCount = 0;
    }

    this.tapCount++;
  }

  admin() {
    console.log('ADMIN');
  }

  start() {
    this.router.navigate(['/game']);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '50%';
    dialogConfig.width = '100%';
    this.dialog.open(ReminderComponent, dialogConfig);
  }

  darkmode() {
    document.querySelector('body').style.backgroundImage = '';

    if (!this.gloVarService.isDarkTheme) {
      document.querySelector('body').style.backgroundColor = 'rgb(53, 1, 65)';
    } else {
      document.querySelector('body').style.backgroundColor = '#3f3f50';
    }
  }

  update() {
    this.pwa.updateApp();
  }

  dbb = firebase.default.firestore();

  async loadData() {
    if (this.gloVarService.txtList.length === 0) {
      this.dbb.enableNetwork().then(() => {
        this.getText();
      });

      return;
    }

    this.gloVarService.txtList = [];

    this.dbb.disableNetwork().then(() => {
      this.getText();
    });
  }

  private getText() {
    this.dbb
      .collection('text')
      .onSnapshot({ includeMetadataChanges: true }, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            this.gloVarService.txtList.push(change.doc.data());
          }

          var source = snapshot.metadata.fromCache ? 'local cache' : 'server';
          console.log('Data came from ' + source);
          this.router.navigate(['/config']);
          this.router.navigate(['/config']);
        });
      });
  }
}
