import {
  EventEmitter,
  Output,
  ViewChild,
  OnInit,
  OnChanges,
  SimpleChanges,
  AfterViewInit
} from '@angular/core'
import { MatTablePadre } from './mat-table/mat-table'
import {
  MatSort,
  MatPaginator,
  MatTableDataSource,
  MatTable
} from '@angular/material'

export interface EventoClickTabla<T = any> {
  numeroFila: number
  data: ContenidoFila<T>
}

export interface ContenidoFila<T = any> {
  id: string
  data: T
}

export class MaterialTableC<T = any> extends MatTablePadre<T>
  implements OnInit, OnChanges, AfterViewInit {
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

  ngOnInit() {
    this.inicializar()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && !changes.data.isFirstChange()) {
      this.renderizarTabla()
    }
  }

  renderizarTabla() {
    this.dataSource = new MatTableDataSource(this.data)
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
    this.dataSource.filter = this.filterValue
    this.table.renderRows()
  }

  ngAfterViewInit() {}

  applyFilter(filterValue: string) {
    this.filterValue = filterValue.trim().toLowerCase()
    this.dataSource.filter = this.filterValue
    this.filterEvent.emit(filterValue)
  }

  clickEvent(data, numeroFila) {
    if (!data.isTrusted) {
      this.click_interno.emit({
        numeroFila: numeroFila,
        data: data
      })
    }
  }

  clickExterno(data) {
    if (!data.isTrusted) {
      this.click_externo.emit(data)
    }
  }

  editar(row, column) {
    this.edit.emit({
      column: column,
      row: row
    })
  }

  protected inicializar() {
    if (this.displayedColumns) {
      for (let index = 0; index < this.displayedColumns.length; index++) {
        const element = this.displayedColumns[index]
        this.columnsToDisplay.push(element.columna)
      }

      this.dataSource = new MatTableDataSource(this.data)
      this.loading = false
    }
    setTimeout(() => {
      if (this.paginator) {
        this.dataSource.paginator = this.paginator
      }
      if (this.sort) {
        this.dataSource.sort = this.sort
      }
    }, 100)
  }
}
