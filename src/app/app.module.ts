import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppService } from './app.service';
import { AppRoutingModule } from './app-routing.module';
import { ResultComponent } from './result/result.component';
import { KeyTableComponent } from './content/key-table/key-table.component';
import { ContentService } from './content/content.service';
import { ManageKeyTableComponent } from './content/key-table/manage-key-table/manage-key-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material';
import { DataTableModule } from 'primeng/datatable';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MatchingComponent } from './matching/matching.component';
import { MatchEditComponent } from './matching/match-edit/match-edit.component';
import { MatchingService } from './matching/matching.service';
import { KeyTableService } from './content/key-table/key-table.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    ResultComponent,
    KeyTableComponent,
    ManageKeyTableComponent,
    MatchingComponent,
    MatchEditComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    DataTableModule,
    PaginatorModule,
    ButtonModule,
    CardModule,
    ChartModule,
  ],
  providers: [AppService, ContentService, MatchingService, KeyTableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
