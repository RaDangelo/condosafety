import { environment } from '../environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    get apiUrl(): string {
        let url = environment.apiUrl;
        return url ? url : 'http://localhost:8081';
    }

    get showServiceUrl(): boolean {
        return environment.showServiceUrl === true;
    }
}
