import { Component, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { VideoInputModel } from '../../../models';
import { ImageManipulation } from '../../../utils/image-manipulation';
import * as globals from '../../../globals';

declare var tracking: any;
declare var document: any;
declare var $: any;

@Component({
    selector: 'photo-modal',
    templateUrl: './photo-modal.component.html',
    styleUrls: ['./photo-modal.component.less']
})
export class PhotoComponent implements AfterViewInit {

    frontCamera: any;
    videoInputs: Array<VideoInputModel> = new Array<VideoInputModel>();
    pictureTimer = 10;
    picture: any;
    photob64: string;
    trackerTask: any;
    auto = false;

    @Output() imageReady = new EventEmitter<any>();

    _params = {};
    @Input() set params(p: any) {
        this.lookForDevices();
        if (p && p.takePicture) {
            if (!this.trackerTask) {
                setTimeout(this.callTracker.bind(this), 1000);
            } else {
                this.trackerTask.run();
            }
            this._params = p;
            if (p.autoStart) {
                this.auto = true;
                this.autoStart();
            } else {
                this.auto = false;
            }
        }
    }

    get params() {
        return this._params;
    }

    constructor() {
    }

    ngAfterViewInit() {
    }

    private autoStart() {
        this.startTimer(10);
        setTimeout(() => {
            this.takePicture();
        }, 11000);
    }

    takePicture() {
        $('.flash').css('z-index', '5');
        $('.flash').effect('highlight', { color: 'white' }, 'slow');
        this.picture = this.getImageFromPicture(this.getPicture());
        if (this.trackerTask) {
            this.trackerTask.stop();
        }
        this.imageReady.emit({ picture: this.picture, b64: this.photob64, auto: this.auto });
    }

    private lookForDevices() {
        navigator.mediaDevices.enumerateDevices()
            .then(this.getDevices.bind(this));
    }

    private getDevices(infos) {
        console.log(infos);
        for (const i of infos) {
            if (i.kind === 'videoinput') {
                const vid = new VideoInputModel();
                vid.id = i.deviceId;
                vid.name = i.label;
                this.videoInputs.push(vid);
            }
        }
        this.setFrontCamera();
    }

    private setFrontCamera() {
        this.frontCamera = document.getElementById('frontCamera');
        console.log(this.videoInputs[1].id);
        const media: MediaTrackConstraints = { deviceId: this.videoInputs[1].id };
        navigator.mediaDevices.getUserMedia({ video: media })
            .then(stream => {
                this.frontCamera.src = window.URL.createObjectURL(stream);
                this.frontCamera.play();
            });
        // navigator.mediaDevices.getUserMedia({ video: true })
        //   .then(stream => {
        //     this.frontCamera.src = window.URL.createObjectURL(stream);
        //     this.frontCamera.play();
        //   });
    }

    private getPicture() {
        return ImageManipulation.drawCameraImage(this.frontCamera, true);
    }

    private startTimer(timer: number) {
        this.pictureTimer = timer;
        console.log(this.pictureTimer);
        if (timer > 0) {
            setTimeout(() => {
                this.startTimer(timer - 1);
            }, 1000);
        }
    }

    private callTracker() {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');

        const tracker = new tracking.ObjectTracker('face');
        tracker.setInitialScale(4);
        tracker.setStepSize(2);
        tracker.setEdgesDensity(0.1);


        this.trackerTask = tracking.track('#frontCamera', tracker, { camera: true });
        tracker.on('track', function (event) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            event.data.forEach(function (rect) {
                context.strokeStyle = '#a64ceb';
                context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                context.font = '11px Helvetica';
                context.fillStyle = '#fff';
                context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11);
                context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22);
                globals.GlobalVars.imgX = rect.x;
                globals.GlobalVars.imgY = rect.y;
                globals.GlobalVars.imgWidth = rect.width;
                globals.GlobalVars.imgHeight = rect.height;

            });
        });
        // const gui = new dat.GUI();
        // gui.add(tracker, 'edgesDensity', 0.1, 0.5).step(0.01);
        // gui.add(tracker, 'initialScale', 1.0, 10.0).step(0.1);
        // gui.add(tracker, 'stepSize', 1, 5).step(0.1);
    };

    private getImageFromPicture(context: any) {
        this.photob64 = ImageManipulation.fromCanvasToImage(context);
        return ImageManipulation.fromImageToFile(this.photob64, 'image-to-compare.png');
    }
}
