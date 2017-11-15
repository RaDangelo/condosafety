import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cpf'
})

export class CpfPipe implements PipeTransform {
    transform(value: string): string {

        if (value) {
            value = value.replace(/\D+/g, '');
            if (value.length < 3) {
                return value;
            } else if (value.length < 6) {
                return value.substr(0, 3) + '.' + value.substr(3);
            } else if (value.length < 9) {
                return value.substr(0, 3) + '.' + value.substr(3, 3) + '.' + value.substr(6);
            } else {
                return value.substr(0, 3) + '.' + value.substr(3, 3) + '.' + value.substr(6, 3) + '-' + value.substr(9);
            }
        } else {
            value = '';
            return value;
        }

    }
}