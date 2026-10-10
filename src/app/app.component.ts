import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { NavbarComponent } from './navbar/navbar.component';
import { ListaAlumnosComponent } from './escuela/lista-alumnos/lista-alumnos.component'
import { ZodiacoComponent } from './formularios/zodiaco/zodiaco.component'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,ListaAlumnosComponent,ZodiacoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'web-app';

  ngOnInit(): void {
    initFlowbite();
  }
}
