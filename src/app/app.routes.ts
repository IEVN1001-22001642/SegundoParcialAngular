import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'formularios',
    children:[
      {
        path:'usuarios',
        loadComponent:()=>
          import('./formularios/usuarios/usuarios.component').then((c)=>c.UsuariosComponent)
      },
      {
        path:'zodiaco',
        loadComponent:()=>
          import('./formularios/zodiaco/zodiaco.component').then((c)=>c.ZodiacoComponent)
      }
    ]
  },
  {
    path:'', redirectTo: 'admin', pathMatch:'full'
  },
  {
    path:'', redirectTo: 'admin'
  },

];
