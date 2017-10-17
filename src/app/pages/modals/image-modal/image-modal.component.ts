import { Component, Input } from '@angular/core';

@Component({
    selector: 'image-modal',
    templateUrl: './image-modal.component.html',
    styleUrls: ['./image-modal.component.less']
})
export class ImageComponent {

    @Input() image: string;

    constructor() {
    }
}
