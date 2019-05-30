import { TooltipPosition } from '@angular/material'
import { TypeButton } from '../type-button.enum';
export interface MyButtonInterface
{
  titulo: string
  id: string
  class?: string
  type: TypeButton
  disabled?: boolean
  imagen?: string
  color?: 'warn' | 'primary' | 'accent'
  tooltipTitulo?: string
  toolTipPosition?: TooltipPosition
  mostrar?( data: any ): boolean
  estado?( data: any ): boolean
}
