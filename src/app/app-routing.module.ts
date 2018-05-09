import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { ResultComponent } from './result/result.component';
import { KeyTableComponent } from './content/key-table/key-table.component';
import { ManageKeyTableComponent } from './content/key-table/manage-key-table/manage-key-table.component';
import { MatchingComponent } from './matching/matching.component';
import { MatchEditComponent } from './matching/match-edit/match-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'search', pathMatch: 'full' },
    { path: 'search', component: ContentComponent },
    { path: 'result', component: ResultComponent },
    { path: 'keytable', component: KeyTableComponent },
    { path: 'manage', component: ManageKeyTableComponent },
    { path: 'match', component: MatchingComponent },
    { path: 'match/edit', component: MatchEditComponent },
    { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
