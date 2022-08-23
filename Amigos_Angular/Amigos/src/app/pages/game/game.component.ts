import {
  Component,
  OnInit,
  AfterContentInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GloVarService } from 'src/app/services/glo-var.service';
import { ReminderComponent } from 'src/app/dialog/reminder.component';
import { TxtService } from 'src/app/services/txt.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, AfterViewInit {
  constructor(
    public dialog: MatDialog,
    public gloVarService: GloVarService,
    public texts: TxtService,
    private router: Router,
    private db: AngularFirestore,
    private ARouter: ActivatedRoute
  ) {}

  @ViewChild('stack') stack: ElementRef;

  title = 'Game';
  cardTxt: string;
  cardElem: Array<any>;
  txtList: Array<any> = [];
  players: string[] = [];
  player = '';

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '50%';
    this.dialog.open(ReminderComponent, dialogConfig);
  }

  ngOnInit() {
    this.players = this.gloVarService.playersList;

    this.gloVarService.txtList.forEach((element) => {
      var index = Math.floor(
        Math.random() * (this.players.length - 1 - 0 + 1) + 0
      );
      this.player = this.players[index];

      element.player = this.player;
    });

    this.txtList = this.gloVarService.txtList;

    for (let i: number = this.txtList.length - 1; i > -1; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.txtList[i];
      this.txtList[i] = this.txtList[j];
      this.txtList[j] = temp;
    }

    this.player = this.players[0];

    if (this.txtList.length == 0) this.router.navigate(['/']);

    console.log(this.txtList.length);
  }

  rdmPlayer() {
    var index = Math.floor(Math.random() * (this.players.length - 0 + 1) + 0);
    this.player = this.players[index];
  }

  darkmode() {
    document.querySelector('body').style.backgroundImage = '';
    if (!this.gloVarService.isDarkTheme) {
      document.querySelector('body').style.backgroundColor = 'rgb(53, 1, 65)';
    } else {
      document.querySelector('body').style.backgroundColor = '#3f3f50';
    }
  }

  ngAfterViewInit() {
    this.removeAllBorder();
  }

  tap(elem: any) {
    this.cardTxt = elem.id;
    this.cardElem = this.txtList[this.txtList.length - 1];

    console.log(this.txtList[this.txtList.length - 1]);
    this.removeBorderAni();
    elem.style.animation = 'swap 800ms';

    setTimeout(() => {
      elem.style.animation = '';
      this.txtList.pop();
      this.checkLast();
      //this.txtList.unshift(this.cardElem)
      setTimeout(() => {
        this.addBorderAni();
        this.removeAllBorder();
      }, 50);
    }, 850);
  }

  checkLast() {
    console.log(this.txtList.length);
    if (this.txtList.length == 0) {
      this.router.navigate(['/']);
    }
  }

  addBorderAni() {
    let stackArray = this.stack.nativeElement.children;
    let lastChild = stackArray[stackArray.length - 1];

    if (this.gloVarService.isDarkTheme) {
      lastChild.classList.add('dark-border');
    } else {
      lastChild.classList.add('border');
    }
  }

  removeBorderAni() {
    let stackArray = this.stack.nativeElement.children;
    let lastChild = stackArray[stackArray.length - 1];
    lastChild.classList = '';
  }

  removeAllBorder() {
    let stackArray = this.stack.nativeElement.children;

    for (let i = 0; i < stackArray.length - 1; i++) {
      stackArray[i].classList = '';
    }
  }

  /*

  txtToDb() {

    this.texts.text.forEach(item => {

      // Add a new document in collection "cities"
      this.db.collection("text").doc().set({
        Id: item.id,
        txt: item.t
      })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    })


  }



*/
}
