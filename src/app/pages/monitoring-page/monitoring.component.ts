import * as path from 'path';
import { Stream } from 'stream';
import { Component, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';

import { PersonModel, VisitorModel } from '../../models';
import { PersonServiceInterface } from '../../interfaces';

@Component({
  selector: 'monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.less']
})
export class MonitoringComponent {

  people: Array<any>;
  persons: Array<PersonModel>;
  visitors: Array<VisitorModel>;
  img: string;
  videos: Array<ElementRef>;

  @ViewChild('myname') input: ElementRef;
  @ViewChild('video4') video1: ElementRef;
  @ViewChild('video1') video2: ElementRef;
  @ViewChild('video2') video3: ElementRef;
  @ViewChild('video3') video4: ElementRef;



  @ViewChildren('div1,div2,div3') divs: QueryList<ElementRef>;

  constructor(private personService: PersonServiceInterface) {
    this.people = new Array<any>();
    this.persons = new Array<PersonModel>();
    this.visitors = new Array<VisitorModel>();
    this.videos = new Array<ElementRef>();
    this.img = '../../../../dist/assets/img-test.png';
    this.initMockArrays();
  }

  private initMockArrays() {
    let person1 = new PersonModel();
    person1.name = 'João de Oliveira';
    person1.cpf = '44244016856';
    let person2 = new PersonModel();
    person2.name = 'João de Silva'
    person2.cpf = '12345678922';
    let person3 = new PersonModel();
    person3.name = 'João de Macedo';
    person3.cpf = '12375853223';
    let person4 = new PersonModel();
    person4.name = 'João de Maria';
    person4.cpf = '15053434368';
    let visitor1 = new VisitorModel();
    visitor1.name = 'Rafael Bergamini';
    visitor1.document = '48943103702';
    let visitor2 = new VisitorModel();
    visitor2.name = 'Rafael DAngelo';
    visitor2.document = '32445656877';
    let visitor3 = new VisitorModel();
    visitor3.name = 'Gustavo Bergamini';
    visitor3.document = '33325557893';

    this.persons = [person1, person2, person3, person4];
    this.visitors = [visitor1, visitor2, visitor3];
    this.people = [visitor1, visitor2, visitor3, person1, person2, person3, person4];
  }

  ngAfterViewInit() {
    this.videos = [this.video1, this.video2, this.video3, this.video4];
    for (let v of this.videos) {
      let _video = v.nativeElement;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
            _video.src = window.URL.createObjectURL(stream);
            _video.play();
          })
      }
    }
  }


}
