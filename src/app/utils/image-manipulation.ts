import * as globalVars from '../globals';

declare var document: any;

export class ImageManipulation {

    static drawCameraImage(camera: any, flip?: boolean) {
        let context;
        context = document.getElementById('canvas').getContext('2d');
        return flip ? ImageManipulation.drawFlipedImage(camera, context) :
            ImageManipulation.drawImage(camera, context);
    }

    static drawFlipedImage(camera: any, context: any) {
        context.save();
        context.scale(-1, 1);
        console.log('X', globalVars.GlobalVars.imgX);
        console.log('Y', globalVars.GlobalVars.imgY);
        console.log('W', globalVars.GlobalVars.imgWidth);
        console.log('H', globalVars.GlobalVars.imgHeight);
        const x = globalVars.GlobalVars.imgX;
        const y = globalVars.GlobalVars.imgY;
        const width = globalVars.GlobalVars.imgWidth;
        const height = globalVars.GlobalVars.imgHeight;
        context.drawImage(camera, x + width + 30,
            y + height - 10,
            x + width - 40, y + height - 10,
            0, 0, 320 * -1, 240);

        context.restore();
        return context;
    }

    static drawImage(camera: any, context: any) {
        context.drawImage(camera, 0, 0, 240, 320);
        return context;
    }

    static fromCanvasToImage(context: any) {
        return context.canvas.toDataURL('image/png');
    }

    static fromImageToFile(picture: any, name: string) {
        return this.dataURLtoFile(picture, name);
    }

    static dataURLtoFile(dataurl, filename) {
        const arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

}