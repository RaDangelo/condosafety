import { MonitoringComponent } from './pages/monitoring-page/monitoring.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdministrationComponent } from './pages/administration-page/administration.component';
import { PeopleComponent } from './pages/people-page/people.component';
import { ReportsComponent } from './pages/reports-page/reports.component';

import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    { path: '', component: LoginPageComponent },
    { path: 'monitoring', component: MonitoringComponent},
    { path: 'admin', component: AdministrationComponent},
    { path: 'people', component: PeopleComponent},
    { path: 'reports', component: ReportsComponent}

];