import { Input, OnDestroy } from '@angular/core';
import { TooltipPosition } from '@angular/material';
import { TypeButton } from '@shared/buttons/type-button.enum';

export interface MyButtonInterface
{
  titulo: string;
  id: string;
  class?: string;
  type: TypeButton;
  disabled?: boolean;
  imagen?: string;
  color?: 'warn' | 'primary' | 'accent';
  tooltipTitulo?: string;
  toolTipPosition?: TooltipPosition;
  mostrar?( data: any ): boolean;
  estado?( data: any ): boolean;
}

export interface ColumnaMaterialTable
{
  header: string;
  columna: string;
  editable?: true;
}

export class MatTablePadre<T = any> implements OnDestroy
{
  @Input() data: T[] = [];
  @Input() filterValue: string;
  @Input() displayedColumns: ColumnaMaterialTable[];
  @Input() buttons: MyButtonInterface[];
  @Input() buttonsExt: MyButtonInterface[];
  @Input() page_size = 10;
  filaEscogida: T;
  activo = true;
  loading = true;

  mantenerFiltro ( filtro: string )
  {
    setTimeout( () =>
    {
      this.filterValue = filtro;
    }, 1 );
  }

  actualizarFilaTabla ( id: string, nuevoElemento: T, parametros: string[] = [] )
  {
    let fila: T;
    let i = 0;
    for ( let index = 0; index < this.data.length; index++ ) {
      fila = this.data[ index ];
      i = index;
      if ( fila[ id ] !== null && fila[ id ] === this.filaEscogida[ id ] ) {
        index = this.data.length;
      }
    }
    if ( parametros.length === 0 ) {
      fila = nuevoElemento;
      this.data[ i ] = fila;
    } else {
      for ( let index = 0; index < parametros.length; index++ ) {
        const parametro = parametros[ index ];
        fila[ parametro ] = nuevoElemento[ parametro ];
        this.data[ i ][ parametro ] = fila[ parametro ];
      }
    }
  }

  async desactivarBotonesInternos (): Promise<any>
  {
    const promise = await new Promise( ( resolve, reject ) =>
    {
      for ( let index = 0; index < this.buttons.length; index++ ) {
        this.buttons[ index ].disabled = true;
      }
      resolve( true );
      reject( false );
    } );
    return promise;
  }

  activarBotonesInternos ()
  {
    for ( let index = 0; index < this.buttons.length; index++ ) {
      setTimeout( () =>
      {
        this.buttons[ index ].disabled = false;
      }, 0 );
    }
  }

  desactivarBotonesExternos ()
  {
    for ( let index = 0; index < this.buttonsExt.length; index++ ) {
      setTimeout( () =>
      {
        this.buttonsExt[ index ].disabled = false;
      }, 0 );
    }
  }

  activarBotonesExternos ()
  {
    for ( let index = 0; index < this.buttonsExt.length; index++ ) {
      setTimeout( () =>
      {
        this.buttonsExt[ index ].disabled = true;
      }, 0 );
    }
  }

  ngOnDestroy (): void
  {
    this.activo = false;
  }
}
