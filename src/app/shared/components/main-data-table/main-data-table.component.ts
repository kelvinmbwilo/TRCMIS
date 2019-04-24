import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {fadeIn, fadeSmooth, ROUTE_ANIMATIONS_ELEMENTS} from '../../animations/router-animation';
import {ActionButton} from './action-button.model';

@Component({
  selector: 'app-main-data-table',
  templateUrl: './main-data-table.component.html',
  styleUrls: ['./main-data-table.component.scss'],
  animations: [fadeSmooth, fadeIn]
})
export class MainDataTableComponent implements OnInit, OnChanges {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  /** Table Inputs */
  @Input()
  tableList = [];
  @Input()
  tableConfigurations: {
    tableColumns: Array<{ name: string; label: string; type: string; }>;
    tableCaption: string;
    allowPagination?: boolean;
    tableNotifications: any;
    actionIcons?: any;
    doneLoading?: any;
    deleting?: any;
    showSearch?: boolean;
    showBorder?: boolean;
    empty_msg?: string;
    hideExport: boolean;
    customPrimaryMessage: string;
    active?: {};
  } = {
    tableColumns: [],
    tableCaption: '',
    allowPagination: true,
    tableNotifications: null,
    actionIcons: {
      edit: false,
      delete: false,
      download: false,
      more: false,
      print: false,
      cancel: false
    },
    doneLoading: false,
    deleting: {},
    active: {},
    showSearch: true,
    showBorder: true,
    customPrimaryMessage: '',
    empty_msg: 'No Data',
    hideExport: false
  };
  @Input()
  loading: boolean;
  searchFieldControl: FormControl;

  /** Table Events */
  @Output()
  rowCustomPrimary: EventEmitter<any> = new EventEmitter();
  @Output()
  rowUpdate: EventEmitter<any> = new EventEmitter();
  @Output()
  rowDownload: EventEmitter<any> = new EventEmitter();
  @Output()
  rowDelete: EventEmitter<any> = new EventEmitter();
  @Output()
  rowPreview: EventEmitter<any> = new EventEmitter();
  @Output()
  rowPrint: EventEmitter<any> = new EventEmitter();

  @Output()
  customAction: EventEmitter<any> = new EventEmitter();

  @Input()
  loadingMessage: string = null;

  // list of all the added buttons that you want to deal with separately
  @Input() actionButtons: ActionButton[] = [];


  /** list of fields that are searchable */
  searchFields: string;
  showDelete: any = {};
  showDownload: any = {};

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  showButtonConfirm: any = {};
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor() {
    this.searchFieldControl = new FormControl('');
    // this.searchFieldControl.valueChanges.subscribe(v => console.log({ v }));
    if (this.tableConfigurations) {
      this.tableConfigurations.showSearch =
        this.tableConfigurations.showSearch !== null
          ? this.tableConfigurations.showSearch
          : true;
      this.tableConfigurations.allowPagination =
        this.tableConfigurations.allowPagination !== null
          ? this.tableConfigurations.allowPagination
          : true;
      this.tableConfigurations.showBorder =
        this.tableConfigurations.showBorder !== null
          ? this.tableConfigurations.showBorder
          : false;
      this.searchFields = this.tableConfigurations.tableColumns
        .map(column => column.name)
        .join(',');
      this.tableConfigurations.actionIcons = this.tableConfigurations
        .actionIcons
        ? this.tableConfigurations.actionIcons
        : {
            edit: false,
            delete: false,
            download: false,
            more: false,
            print: false,
            cancel: false,
            customPrimary: false,
          };
      this.tableConfigurations.active = this.tableConfigurations.active
        ? this.tableConfigurations.active
        : {};
    } else {
      this.tableConfigurations.showSearch = true;
      this.tableConfigurations.allowPagination = true;
      this.tableConfigurations.showBorder = false;
      this.tableConfigurations.actionIcons = {
        edit: false,
        delete: false,
        more: false,
        download: false,
        print: false,
        cancel: false,
        customPrimary: false,
      };
    }
  }

  ngOnInit() {

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.tableList);
    const { edit, print, more, cancel, download, customPrimary } = this.tableConfigurations.actionIcons;
    const colums = [
      'position',
      ...this.tableConfigurations.tableColumns.map(column => column.name)
    ];
    if (
      edit ||
      print ||
      download ||
      more ||
      cancel ||
      customPrimary ||
      this.tableConfigurations.actionIcons.delete
    ) {
      this.displayedColumns = [...colums, 'action'];
    } else {
      this.displayedColumns = colums;
    }
    if ( this.tableConfigurations.allowPagination ) {
      this.dataSource.paginator = this.paginator;
    }
    this.dataSource.sort = this.sort;
    if ( this.tableConfigurations.allowPagination ) {
      this.dataSource.paginator = this.paginator;
    }
  }

  viewItemDetails(itemId) {
    this.rowPreview.emit(itemId);
  }

  editItem(itemId) {
    this.rowUpdate.emit(itemId);
  }

  printItem(itemId) {
    this.rowPrint.emit(itemId);
  }

  deleteItem(itemId) {
    this.rowDelete.emit(itemId);
  }

  downloadItem(item) {
    this.rowDownload.emit(item);
  }

  trackByFn(index, item) {
    return item ? item.id : undefined;
  }


  submitCustomButtom(button: ActionButton, item, step) {
    const action = button.action;
    this.showButtonConfirm = {};
    if (step === 'first' && button.confirm_first) {
      this.showButtonConfirm[button.id + item.id] = true;
    } else {
      this.customAction.emit({action, value: item});
    }
  }

  customPrimaryItem(item) {
    this.rowCustomPrimary.emit(item);
  }



  downloadToCsv() {
    const data = this.tableList.map(item => {
      const object = {};
      for (const col of this.tableConfigurations.tableColumns) {
        object[col.name] = item[col.name] ? item[col.name] : '';
      }
      return object;
    });

    const csvFile = new ngxCsv(data, 'My Report', {
      headers: this.tableConfigurations.tableColumns.map(col => col.label)
    });
  }
}
