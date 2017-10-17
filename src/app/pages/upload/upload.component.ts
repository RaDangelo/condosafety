import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { FileUploader, FileItem, FileUploaderOptions } from 'ng2-file-upload';
import { Router } from '@angular/router';
import { VehicleServiceInterface } from '../../interfaces';
import { AccessType } from '../../models';
import { RESTService } from '../../../app/rest.service';

declare var $: any;

@Component({
    selector: 'upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.less']
})
export class UploadComponent implements OnInit {

    uploader: FileUploader;

    _owner: string;
    @Input() set id(owner: string) {
        if (owner) {
            this._owner = owner;
            this.setUploader();
        }
    }

    get imageOwner() {
        return this._owner;
    }

    @Input() set upload(execute: boolean) {
        if (execute) {
            this.uploadFile();
        }
    }

    @Output() uploadFinished = new EventEmitter();

    constructor(private restService: RESTService) {
    }

    ngOnInit() {
    }

    closeModal() {
        $('#upload-modal').modal('hide');
    }

    uploadFile() {
        if (this.uploader && this.uploader.queue && this.uploader.queue.length > 0) {
            this.uploader.queue[this.uploader.queue.length - 1].upload();
        }
    }

    resetQueue() {
        if (this.uploader && this.uploader.queue && this.uploader.queue.length > 0) {
            this.uploader.queue = new Array<FileItem>();
        }
    }

    private setUploader() {
        const fileUploaderOptions: FileUploaderOptions = {
            url: this.restService.getBaseUrl() + '/image/' + this.imageOwner,
            disableMultipart: false, queueLimit: 1
        };
        this.uploader = new FileUploader(fileUploaderOptions);
        this.uploader.onCompleteItem = ((item: any, response: any, status: any, headers: any): any => {
            console.log('Imagem inserida na base com sucesso!');
            this.uploadFinished.emit();
        });
    }

}
