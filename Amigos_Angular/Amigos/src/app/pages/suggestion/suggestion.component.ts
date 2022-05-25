import { Component, OnInit } from '@angular/core';
import { GloVarService } from 'src/app/services/glo-var.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {

  constructor(public gloVarService: GloVarService,
    private db: AngularFirestore, private _snackBar: MatSnackBar) { }

  playerName: string = "";

  ngOnInit(): void {

    this.checkPlayer();

  }

  checkPlayer() {
    this.playerName = "";

    console.log(localStorage.getItem('PlayerName'))

    if (localStorage.getItem('PlayerName') == null) {
      return
    }

    this.playerName = localStorage.getItem('PlayerName');
  }

  darkmode() {
    document.querySelector('body').style.backgroundImage = ""
    if (!this.gloVarService.isDarkTheme) {
      document.querySelector('body').style.backgroundColor = "rgb(53, 1, 65)"
    } else {
      document.querySelector('body').style.backgroundColor = "#3f3f50"
    }
  }



  suggi: string = ""

  suggestionT: FormGroup = new FormGroup({
    suggi: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required,])
  })

  submit() {



    if (this.playerName == "") {

      localStorage.setItem('PlayerName', this.suggestionT.value.name)

    }
    else {
      this.suggestionT.setValue(({ suggi: this.suggestionT.value.suggi, name: this.playerName }));
      //this.suggestionT.value.name = this.playerName;

    }

    if (this.suggestionT.status != 'VALID') {
      this._snackBar.open('Please fill in all fields', null, {
        duration: 5 * 1000,
      });

      return
    }

    this.txtToDb(this.suggestionT.value);
    this.suggestionT.reset();
    this.ngOnInit();



  }

  txtToDb(val: any) {


    // Add a new document in collection "cities"
    this.db.collection("suggi").doc().set({
      txt: val.suggi,
      name: val.name
    })
      .then(() => {
        console.log("Document successfully written!");
        this._snackBar.open(' Successfully written!', null, {
          duration: 5 * 1000,
        });
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });


  }


}
