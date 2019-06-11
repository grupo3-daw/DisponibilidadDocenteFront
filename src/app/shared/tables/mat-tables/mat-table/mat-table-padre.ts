import { EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';

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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<T>;
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.inicializar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.data);
    if (changes.data && !changes.data.isFirstChange()) {
      this.renderizarTabla();
    }
  }

  renderizarTabla(): void {
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filter = this.filterValue;
    this.table.renderRows();
  }

  applyFilter(filterValue: string): void {
    this.filterValue = filterValue.trim()
    .toLowerCase();
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

  inicializar(): void {
    if (this.displayedColumns) {
      for (const element of this.displayedColumns) {
        this.columnsToDisplay.push(element.columna);
      }

      this.dataSource = new MatTableDataSource(this.data);
      this.loading = false;
    }
    setTimeout(() => {
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.sort) {
        this.dataSource.sort = this.sort;
      }
    }, 100);
  }
}
