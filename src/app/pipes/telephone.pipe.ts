import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phone'
})

export class PhonePipe implements PipeTransform {

    transform(value: string): string {

        if (value) {
            if (value.length === 10) {
                return '(' + value.substr(0, 2) + ') ' + value.substr(2, 4) + '-' + value.substr(6);

            } else if (value.length === 11) {
                return '(' + value.substr(0, 2) + ') ' + value.substr(2, 5) + '-' + value.substr(7);

            } else {
                return value;
            }
        } else {
            value = '';
            return value;

        }
    }
}