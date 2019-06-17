import { EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { MatTableData } from './mat-table-data';

export interface EventoClickTabla<T = any> {
  numeroFila: number;
  data: ContenidoFila<T>;
}

export interface ContenidoFila<T = any> {
  id: string;
  data: T;
}

export class MatTablePadre<T = any> extends MatTableData<T> implements OnInit, OnChanges {
  @Output() readonly clickInterno = new EventEmitter<EventoClickTabla<T>>();
  @Output() readonly clickExterno = new EventEmitter<EventoClickTabla<T>>();
  @Output() readonly edit = new EventEmitter<any>();
  @Output() readonly filterEvent = new EventEmitter<string>();
  dataSource: MatTableDataSource<T>;
  sortedData: T;
  columnsToDisplay: Array<string> = [];
  resultsLength = 0;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild('table', {static: false}) table: MatTable<T>;
  constructor() {
    super();
  }

  ngOnInit(): void {
    console.log('onInit');
    this.inicializar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.data.currentValue);
    console.log(this.data);
    if (changes.data && !changes.data.isFirstChange()) {
      this.renderizarTabla();
    }
  }

  inicializar(): void {
    if (this.displayedColumns) {
      for (const element of this.displayedColumns) {
        this.columnsToDisplay.push(element.columna);
      }
      this.dataSource = new MatTableDataSource(this.data);
    }
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  renderizarTabla(): void {
    this.dataSource.data = this.data;
    setTimeout(() => {
      this.table.renderRows();
    }, 100);
  }

  applyFilter(filterValue: string): void {
    console.log(filterValue);
    this.filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = this.filterValue;
    this.filterEvent.emit(filterValue);
  }

  clickEvent(data, numeroFila): void {
    if (!data.isTrusted) {
      this.clickInterno.emit({
        numeroFila,
        data
      });
    }
  }

  clickEventExterno(data): void {
    if (!data.isTrusted) {
      this.clickExterno.emit(data);
    }
  }

  editar(row, column): void {
    this.edit.emit({
      column,
      row
    });
  }


}
