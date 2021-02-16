import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GloVarService {

  constructor() { }

  isDarkTheme: boolean = false;
}
