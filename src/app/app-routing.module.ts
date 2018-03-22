import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { ResultComponent } from './result/result.component';
import { KeyTableComponent } from './content/key-table/key-table.component';
import { ManageKeyTableComponent } from './content/key-table/manage-key-table/manage-key-table.component';
import { MatchingComponent } from './matching/matching.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'search', pathMatch: 'full' },
    { path: 'search', component: ContentComponent },
    { path: 'result', component: ResultComponent },
    { path: 'table', component: KeyTableComponent },
    { path: 'manage', component: ManageKeyTableComponent },
    { path: 'match', component: MatchingComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
