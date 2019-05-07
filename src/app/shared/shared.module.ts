import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './pipes/search.pipe';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TopbannerComponent } from './components/topbanner/topbanner.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { MainDataTableComponent } from './components/main-data-table/main-data-table.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SaveAreaComponent } from './components/save-area/save-area.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { WithoutPipe } from './pipes/without.pipe';
import { HttpClientModule } from '@angular/common/http';
import {TreeModule} from 'angular-tree-component';
import {MultiselectComponent} from './components/org-unit-filter/multiselect/multiselect.component';
import {OrgUnitFilterComponent} from './components/org-unit-filter/org-unit-filter.component';
import {TableFormComponent} from './components/table-form/table-form.component';
import {MatSelectSearchComponent} from './components/mat-select-search/mat-select-search.component';
import {ShowButtonPipe} from './components/main-data-table/show-button.pipe';
import {FilterByNamePipe} from './pipes/filter-by-name.pipe';
import {SafeHtmlPipe} from './pipes/safe-html.pipe';
import { TableStyleDirective } from './directives/table-style.directive';
import { ChwLocationsComponent } from './components/chw-locations/chw-locations.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TreeModule.forRoot(),
    RouterModule
  ],
  declarations: [
    SearchPipe,
    TopbannerComponent,
    ClickOutsideDirective,
    MainDataTableComponent,
    LoaderComponent,
    SaveAreaComponent,
    PlaceholderComponent,
    WithoutPipe,
    OrgUnitFilterComponent,
    MultiselectComponent,
    TableFormComponent,
    MatSelectSearchComponent,
    ShowButtonPipe,
    FilterByNamePipe,
    SafeHtmlPipe,
    TableStyleDirective,
    ChwLocationsComponent
  ],
  exports: [
    SearchPipe,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TopbannerComponent,
    ClickOutsideDirective,
    MainDataTableComponent,
    LoaderComponent,
    SaveAreaComponent,
    PlaceholderComponent,
    WithoutPipe,
    OrgUnitFilterComponent,
    MultiselectComponent,
    TableFormComponent,
    MatSelectSearchComponent,
    ShowButtonPipe,
    FilterByNamePipe,
    SafeHtmlPipe,
    ChwLocationsComponent
  ]
})
export class SharedModule {}
