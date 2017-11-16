import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    get apiUrl(): string {
        let url = environment.apiUrl;
        return url ? url : 'http://localhost:8082';
    }

    get showServiceUrl(): boolean {
        return environment.showServiceUrl === true;
    }

    get isElectron(): boolean {
        console.log(`${ENV}`);
        return `${ENV}` === 'production';
    }
}
