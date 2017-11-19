import { Component, Input, ViewChild } from '@angular/core';
import { WatchControlModel, AccessModel, Action, AccessAction } from '../../../models';

@Component({
    selector: 'report-grid',
    templateUrl: './report-grid.component.html',
    styleUrls: ['./report-grid.component.less']
})
export class ReportGridComponent {

    _report: any[];
    @Input() set report(results: any[]) {
        if (results) {
            this._report = results;
            this._report.sort((a: any, b: any) => {
                return (new Date(b.date).valueOf() - new Date(a.date).valueOf());
            });
        }
    }

    get report() {
        return this._report;
    }

    @Input() option: number;

    getAction(a: any) {
        if (a == Action.AFK) {
            return 'Ociosidade';
        } else if (a == Action.LOGIN) {
            return 'Login';
        } else if (a == Action.LOGOUT) {
            return 'Logout';
        }
        return '';
    }

    getPermission(a: any) {
        if (a == AccessAction.ALLOW) {
            return 'Permissão';
        } else if (a == AccessAction.DENY) {
            return 'Negação';
        }
        return '';
    }

    getRequester(r: any) {
        if (r.vehicle) {
            return r.vehicle.brand + ' - ' + r.vehicle.plate;
        } else if (r.person) {
            return r.person.name;
        } else if (r.visitor) {
            return r.visitor.name;
        }
        return '';
    }

    constructor() {

    }
}
