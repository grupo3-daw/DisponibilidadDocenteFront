/**
 * @export
 * @var id:number
*  @var name:string
 */
export interface Rol {
  id:number;
  name:string;
}

/**
 * @export
 * @var id: number
 * @var name: string
 *  @var email: string
 * @var rol: Rol
 */
export interface Usuario {
  id: number;
  name: string;
  email: string;
  role:Rol
}
