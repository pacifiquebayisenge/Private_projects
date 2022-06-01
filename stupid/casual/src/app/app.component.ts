import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {


  title = 'casual';

  @ViewChild('contentDiv')
  d1!: ElementRef;


  imgSetup = (): string => {

    let imgDoms = "";
    let num = 0;


    if (new Date(formatDate(new Date(), 'yyyy-MM-dd', 'en_US')) > new Date('2022-06-18')) {

      for (let i = 0; i <= 25; i++) {


        imgDoms = imgDoms + `<img class="img" src="../assets/img/${i}.png">`


      }

      return imgDoms;

    }



    num = parseInt(formatDate(new Date(), 'dd', 'en_US'));


    for (let i = 0; i <= num; i++) {


      imgDoms = imgDoms + `<img class="img" src="../assets/img/${i}.png">`


    }

    return imgDoms;

  }



  ngAfterViewInit(): void {

    this.imgSetup();
    this.d1.nativeElement.insertAdjacentHTML('beforeend', this.imgSetup());
  }



}
