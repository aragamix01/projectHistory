import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { ResultComponent } from './result/result.component';
import { KeyTableComponent } from './content/key-table/key-table.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'search', pathMatch: 'full' },
    { path: 'search', component: ContentComponent },
    { path: 'result', component: ResultComponent },
    { path: 'table', component: KeyTableComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
