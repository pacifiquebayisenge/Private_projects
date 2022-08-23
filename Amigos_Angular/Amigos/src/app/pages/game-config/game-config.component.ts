import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GloVarService } from 'src/app/services/glo-var.service';

@Component({
  selector: 'app-game-config',
  templateUrl: './game-config.component.html',
  styleUrls: ['./game-config.component.scss'],
})
export class GameConfigComponent implements OnInit {
  allNames: FormGroup;

  players: string[];

  notValid: boolean = false;

  constructor(
    public gloVarService: GloVarService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  createItem() {
    return this.fb.group({
      name: [''],
    });
  }

  addNext() {
    (this.allNames.controls['items'] as FormArray).push(this.createItem());
  }

  removeField(i: number) {
    (this.allNames.controls['items'] as FormArray).removeAt(i);
  }

  submit() {
    console.log(this.allNames.controls['items'] as FormArray);

    this.allNames.value.items.forEach((item) => {
      if (item.name == '') return;

      var result = item.name.trim();
      var result2 =
        result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();

      this.players.push(result2);
    });

    if (this.players.length < 2) {
      this.notValid = true;

      setTimeout(() => {
        this.notValid = false;
      }, 3000);
      return;
    }

    this.gloVarService.playersList = this.players;
    this.router.navigate(['/game']);

    console.log(this.players);
  }

  ngOnInit(): void {
    this.players = [];
    this.allNames = this.fb.group({
      items: this.fb.array([this.createItem(), this.createItem()]),
    });
  }

  back() {
    this.router.navigate(['/']);
  }
}
