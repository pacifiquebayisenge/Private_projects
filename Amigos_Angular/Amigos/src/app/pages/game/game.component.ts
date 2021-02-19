import { Component, OnInit, AfterContentInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GloVarService } from 'src/app/services/glo-var.service';
import { ReminderComponent } from 'src/app/dialog/reminder.component';
import * as kf from './components/card/keyframes';
import { TxtService } from 'src/app/services/txt.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {

  constructor(
    public dialog: MatDialog,
    public gloVarService: GloVarService,
    public texts: TxtService
  ) { }

  @ViewChild('stack') stack: ElementRef;

  title = 'Game';
  cardTxt: string;

  openDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '50%'
    const dialogRef = this.dialog.open(ReminderComponent, dialogConfig);


  }




  cc: Array<string> = ['Lorem Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e eeuw, toen een onbekende drukker een zethaak met letters nam en ze door elkaar husselde om een font-catalogus te maken. ', '2', '3', '4']



  ngOnInit() {

    this.cc.reverse();

    console.log(this.texts.text)

  }

  ngAfterViewInit() {
    this.removeAllBorder();

  }

  tap(elem: any) {
    this.cardTxt = elem.id;

    console.log(this.cardTxt)
    this.removeBorderAni();
    elem.style.animation = 'swap 700ms';


    setTimeout(() => {
      elem.style.animation = '';
      this.texts.text.splice(this.texts.text.indexOf(this.cardTxt), 1)
      this.texts.text.unshift(this.cardTxt)
      setTimeout(() => {
        this.addBorderAni();
        this.removeAllBorder();
      }, 100);

    }, 700);




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










}
