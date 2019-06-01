import { EventEmitter, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatTableDataSource } from '@angular/material';

import { MatTablePadre } from './mat-table/mat-table';

export interface EventoClickTabla<T = any> {
  numeroFila: number
  data: ContenidoFila<T>
}

export interface ContenidoFila<T = any> {
  id: string
  data: T
}

export class MaterialTableC<T = any> extends MatTablePadre<T>
  implements OnInit, OnChanges {
  @ViewChild(MatTable) table: MatTable<T>
  @Output() click_interno = new EventEmitter<EventoClickTabla<T>>()
  @Output() click_externo = new EventEmitter<EventoClickTabla<T>>()
  @Output() edit = new EventEmitter<any>()
  @Output() filterEvent = new EventEmitter<string>()
  dataSource: MatTableDataSource<T>
  sortedData: T
  columnsToDisplay: string[] = []
  resultsLength = 0
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  constructor() {
    super()
  }

  ngOnInit(): void {
    this.inicializar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.data);
    if (changes.data && !changes.data.isFirstChange()) {
      this.renderizarTabla()
    }
  }

  renderizarTabla(): void {
    this.dataSource = new MatTableDataSource(this.data)
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
    this.dataSource.filter = this.filterValue
    this.table.renderRows()
  }

  applyFilter(filterValue: string): void {
    this.filterValue = filterValue.trim().toLowerCase()
    this.dataSource.filter = this.filterValue
    this.filterEvent.emit(filterValue)
  }

  clickEvent(data, numeroFila): void {
    if (!data.isTrusted) {
      this.click_interno.emit({
        numeroFila: numeroFila,
        data: data
      })
    }
  }

  clickExterno(data): void {
    if (!data.isTrusted) {
      this.click_externo.emit(data)
    }
  }

  editar(row, column): void {
    this.edit.emit({
      column,
      row
    });
  }

  protected inicializar(): void {
    if (this.displayedColumns) {
      for (let index = 0; index < this.displayedColumns.length; index++) {
        const element = this.displayedColumns[index]
        this.columnsToDisplay.push(element.columna)
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
