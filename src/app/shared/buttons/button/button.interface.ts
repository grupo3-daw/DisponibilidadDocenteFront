import { TooltipPosition } from '@angular/material';

import { TypeButton } from '../type-button.enum';

export class MyButton {
  tooltipTitulo = '';
  constructor(
    public id: string,
    public titulo = '',
    public color: 'warn' | 'primary' | 'accent' = 'accent',
    public toolTipPosition: TooltipPosition = 'above',
    public mostrar: (data) => boolean = () => true,
    public estado: (data) => boolean = () => true,
    public type: TypeButton = TypeButton.Button,
    public imagen = '',
    public disabled = false,
    public clase = '') {
  }

}

export class IconButton extends MyButton {
  constructor(
    id: string,
    titulo: string,
    imagen: string,
    mostrar: (data) => boolean = () => true,
    color: 'warn' | 'primary' | 'accent' = 'accent',
    estado: (data) => boolean = () => true,
    toolTipPosition: TooltipPosition = 'above'
  ) {
    super(id, titulo, color, toolTipPosition, mostrar, estado, TypeButton.Icon, imagen);
  }
}

export class FabButton extends MyButton {
  constructor(
    id: string,
    titulo: string,
    imagen: string,
    color: 'warn' | 'primary' | 'accent' = 'accent',
    mostrar: (data) => boolean = () => true,
    estado: (data) => boolean = () => true,
    toolTipPosition: TooltipPosition = 'above'
  ) {
    super(id, titulo, color, toolTipPosition, mostrar, estado, TypeButton.Fab, imagen);
  }
}
