import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class UploadBehavior {

    public openModal$: EventEmitter<any>;

    init() {
        this.openModal$ = new EventEmitter<any>();
    }
}