import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ReminderComponent } from './dialog/reminder.component';
import { HomeComponent } from './pages/home/home.component'

import { PwaService } from './services/pwa.service';
import { PromptComponent } from './tools/prompt-component/prompt-component.component';

import { GameComponent } from './pages/game/game.component';
import { CardComponent } from './pages/game/components/card/card.component';
import { MatCardModule } from '@angular/material/card';
import { MatBottomSheetModule, MAT_BOTTOM_SHEET_DEFAULT_OPTIONS } from '@angular/material/bottom-sheet';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


// 1. Import the libs you need
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SplashComponent } from './pages/splash/splash.component';



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoaWNQZGHaq6cKsG-yGM_Uf1RzG7c3f_M",
  authDomain: "amigos-0.firebaseapp.com",
  projectId: "amigos-0",
  storageBucket: "amigos-0.appspot.com",
  messagingSenderId: "879797775842",
  appId: "1:879797775842:web:0558462973e938fc341dbb",
  measurementId: "G-Y9R2N62M1S"
};

const initializer = (pwaService: PwaService) => () => pwaService.initPwaPrompt();


@NgModule({
  declarations: [
    AppComponent,
    ReminderComponent,
    HomeComponent,
    GameComponent,
    CardComponent,
    PromptComponent,
    SplashComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatSlideToggleModule,
    FormsModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule

  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: initializer, deps: [PwaService], multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
