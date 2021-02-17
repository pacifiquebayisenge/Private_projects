import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class GloVarService {

  constructor() { }

  isDarkTheme: boolean = false;
  darkBody = new BehaviorSubject<boolean>(false)





}
