import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GloVarService {

  constructor() { }

  isDarkTheme: boolean = false;
  darkBody = new BehaviorSubject<boolean>(false)
  homePage = new BehaviorSubject<boolean>(false)

  txtList: Array<any> = []







}
