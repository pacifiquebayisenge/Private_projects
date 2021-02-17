import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GloVarService } from 'src/app/services/glo-var.service';
import { ReminderComponent } from 'src/app/dialog/reminder.component';
import * as kf from './components/card/keyframes';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, AfterViewInit {

  constructor(
    public dialog: MatDialog,
    public gloVarService: GloVarService
  ) { }

  title = 'Game';

  openDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '50%'
    const dialogRef = this.dialog.open(ReminderComponent, dialogConfig);


  }




  cc: Array<string> = ['1', '2', '3', '4', 'test']



  ngOnInit() {


  }

  ngAfterViewInit() {
    //this.cc.reverse().forEach(i => this.cc.push(i))
  }

  tap(elem: any) {


    elem.style.animation = 'swap 700ms'
    console.log(elem.style.animation)

    setTimeout(() => {
      elem.style.animation = '';
      this.cc.splice(this.cc.indexOf(elem.innerText), 1)
      this.cc.unshift(elem.innerText)
    }, 700);


  }









}
