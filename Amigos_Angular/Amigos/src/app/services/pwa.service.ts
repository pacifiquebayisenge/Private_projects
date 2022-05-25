import { Injectable, ApplicationRef } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { timer, interval } from 'rxjs';
import { take, timeInterval } from 'rxjs/operators';
import { PromptComponent } from '../tools/prompt-component/prompt-component.component';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GloVarService } from './glo-var.service';


@Injectable({
  providedIn: 'root'
})
export class PwaService {

  private promptEvent: any;

  constructor(
    private bottomSheet: MatBottomSheet,
    private platform: Platform,
    private updates: SwUpdate,
    private _snackBar: MatSnackBar,
    private gloVar: GloVarService
  ) {
    this.updateApp()
  }

  public initPwaPrompt() {
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.promptEvent = event;
        this.openPromptComponent('android');
      });
    }
    if (this.platform.IOS) {
      const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator['standalone']);
      if (!isInStandaloneMode) {
        this.openPromptComponent('ios');
      }
    }
  }

  private openPromptComponent(mobileType: 'ios' | 'android') {
    timer(50)
      .pipe(take(1))
      .subscribe(() => this.bottomSheet.open(PromptComponent, { panelClass: 'custom-bottom-sheet', data: { mobileType, promptEvent: this.promptEvent } }));
  }

  updateApp(): void {


    this.updates.available.subscribe(event => {

      console.log("UPDATE")


      this._snackBar.open("A new update will be installed shrotly", "", {
        duration: 2000,
        panelClass: ['snackbar']
      })

      setTimeout(() => {
        this.updates.activateUpdate().then(() => document.location.reload())
      }, 3000);


    })

  }

  checkUpdates() {

    console.log(this.gloVar.homePage)
    this.gloVar.homePage.asObservable().subscribe(() => {

      const timeInterval = interval(60 * 60 * 1000);

      timeInterval.subscribe(() => {
        this.updates.checkForUpdate().then(() => console.log("checked"));
        console.log("update checked");
      });

    });

  }





}
