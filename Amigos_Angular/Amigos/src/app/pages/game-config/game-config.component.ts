import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { GloVarService } from 'src/app/services/glo-var.service';

@Component({
  selector: 'app-game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.css'],
})
export class GameConfigComponent implements OnInit {
  allNames: FormGroup = this.fb.group({
    names: this.fb.array([
      this.fb.group({
        name: '',
      }),
    ]),
  });

  constructor(public gloVarService: GloVarService, private fb: FormBuilder) {}

  names(): FormArray {
    return this.allNames.get('names') as FormArray;
  }

  newNameField(): FormGroup {
    return this.fb.group({
      name: '',
    });
  }

  addNameField() {
    this.names().push(this.newNameField());
  }

  removeNameField(i: number) {
    this.names().removeAt(i);
    this.onSubmit();
    console.log(this.allNames.get('names'));
  }

  onSubmit() {
    console.log(this.allNames.value);
  }

  ngOnInit(): void {}
}
