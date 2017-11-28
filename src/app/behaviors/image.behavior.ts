import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ImageBehavior {

    public openModal$: EventEmitter<any>;
    public visitorImage$: EventEmitter<any>;
    public visitorImageResult$: EventEmitter<any>;

    init() {
        this.openModal$ = new EventEmitter<any>();
        this.visitorImage$ = new EventEmitter<any>();
        this.visitorImageResult$ = new EventEmitter<any>();
    }
}