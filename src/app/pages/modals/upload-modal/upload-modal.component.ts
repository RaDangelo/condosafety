import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewChecked } from '@angular/core';

import { FileUploader, FileItem, FileUploaderOptions } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { VehicleServiceInterface } from '../../../interfaces';
import { AccessType } from '../../../models';

declare var $: any;

@Component({
    selector: 'upload-image',
    templateUrl: './upload-modal.component.html',
    styleUrls: ['./upload-modal.component.less']
})
export class UploadComponent implements OnInit {

    uploader: FileUploader;
    hasBaseDropZoneOver: boolean;

    _owner: any;
    @Input() set imageOwner(owner: any) {
        if (owner) {
            this._owner = owner;
            this.setUploader();
        }
    }

    get imageOwner() {
        return this._owner;
    }

    constructor(private route: Router, private vehicleService: VehicleServiceInterface) {
    }

    ngOnInit() {
    }

    closeModal() {
        $('#upload-modal').modal('hide');
    }

    upload() {
        if (this.uploader.queue.length > 0) {
            this.uploader.queue[this.uploader.queue.length - 1].upload();
        }
    }

    resetQueue() {
        if (this.uploader.queue.length > 0) {
            this.uploader.queue = new Array<FileItem>();
        }
    }

    private setUploader() {
        const fileUploaderOptions: FileUploaderOptions = {
            url: this.imageOwner.type == AccessType.VEHICLE ? this.vehicleService.getUploadEndpoint(this.imageOwner.id)
                //    : this.imageOwner === AccessType.PERSON.toString() ? this.personService.getUploadEndpoint() :
                //         this.imageOwner === AccessType.VISITOR.toString() ? this.visitorService.getUploadEndpoint() 
                : '',
            disableMultipart: false, queueLimit: 1
        };
        this.uploader = new FileUploader(fileUploaderOptions);
        this.uploader.onCompleteItem = ((item: any, response: any, status: any, headers: any): any => {
            alert('yoohoo!')
        });
    }

}
