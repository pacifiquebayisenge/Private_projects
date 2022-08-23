import { Component, OnInit } from '@angular/core';
import { GloVarService } from 'src/app/services/glo-var.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {
  constructor(
    public gloVarService: GloVarService,
    private db: AngularFirestore,
    private _snackBar: MatSnackBar
  ) {}
  txtList: Array<any> = [];
  ngOnInit(): void {
    this.getSuggis();
  }

  getSuggis() {
    this.txtList = [];

    this.db
      .collection('suggi')
      .get()
      .toPromise()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          let item: any = doc.data();

          this.txtList.push({ id: doc.id, txt: item.txt, name: item.name });
        });
      });
  }

  add(obj: any) {
    let date = Date.now();

    this.db
      .collection('text')
      .doc('0000-' + date)
      .set({
        Id: 0,
        txt: obj.txt,
        name: obj.name,
      })
      .then(() => {
        console.log('Document successfully written!');
        this._snackBar.open('Document successfully written!', null, {
          duration: 5 * 1000,
        });
      })
      .then(() => {
        this.db
          .collection('suggi')
          .doc(obj.id)
          .delete()
          .then(() => {
            console.log('Document successfully deleted!');
            this._snackBar.open('Document successfully deleted!', null, {
              duration: 5 * 1000,
            });
          })
          .catch((error) => {
            console.error('Error removing document: ', error);
          });

        window.location.reload();
        this.ngOnInit();
      })
      .catch((error) => {
        console.error('Error writing document: ', error);
      });
  }

  delete(id: string) {
    this.db
      .collection('suggi')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
        this._snackBar.open('Document successfully deleted!', null, {
          duration: 5 * 1000,
        });
        window.location.reload();
        this.ngOnInit();
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  }
}
