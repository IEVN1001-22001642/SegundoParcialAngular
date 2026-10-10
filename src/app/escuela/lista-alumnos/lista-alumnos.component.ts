import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'

import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAlumno } from './alumnos';

@Component({
  selector: 'app-lista-alumnos',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './lista-alumnos.component.html',
  styleUrl: './lista-alumnos.component.css'
})
export class ListaAlumnosComponent {
  formulario!:FormGroup
  alumno:IAlumno={
    materia:'ssss',
    nombre:'sss',
    correo:'sss',
    matricula:'ssss'
  }

ngOnInit():void{
    this.formulario = new FormGroup({
      matricula:new FormControl(''),
      nombre:new FormControl(''),
      correo:new FormControl(''),
      materia:new FormControl('')
    })
  }

  muestraAlumnos():void{
    this.alumno.matricula=this.formulario.value.matricula
    this.alumno.nombre=this.formulario.value.nombre
    this.alumno.correo=this.formulario.value.correo
    this.alumno.materia=this.formulario.value.materia
  }
}
