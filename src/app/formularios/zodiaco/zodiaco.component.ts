import { Component } from '@angular/core';
import { FormGroup, FormControl, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './zodiaco.component.html',
  styleUrl: './zodiaco.component.css'
})
export class ZodiacoComponent {
  formulario = new FormGroup({
    nombre: new FormControl('', Validators.required),
    apaterno: new FormControl('', Validators.required),
    amaterno: new FormControl('', Validators.required),
    dia: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{1,2}$/)
    ]),
    mes: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{1,2}$/)
    ]),
    anio: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{4}$/)
    ])
  });

  nombreCompleto = '';
  edad: number = 0;
  signoChino = '';
  mensajeError = '';
  imagenSigno = '';

  calcular(): void {
    this.mensajeError = '';
    this.nombreCompleto = '';
    this.edad = null;
    this.signoChino = '';

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.mensajeError = 'Completa todos los campos correctamente.';
    }

    const datos = this.formulario.getRawValue();

    const nombre = datos.nombre!.trim();
    const apaterno = datos.apaterno!.trim();
    const amaterno = datos.amaterno!.trim();

    const dia = parseInt(datos.dia);
    const mes = parseInt(datos.mes);
    const anio = parseInt(datos.anio);

    if (!nombre || !apaterno || !amaterno) {
      this.mensajeError = 'Escribe tu nombre y ambos apellidos.';
    }

    const nacimiento = new Date(anio, mes - 1, dia);
    const hoy = new Date();

    if (
      anio < 1 ||
      nacimiento.getFullYear() !== anio ||
      nacimiento.getMonth() !== mes - 1 ||
      nacimiento.getDate() !== dia ||
      nacimiento > hoy
    ) {
      this.mensajeError = 'Ingresa una fecha de nacimiento válida.';
    }

    let edadCalculada = hoy.getFullYear() - anio;

    const yaCumplio =
      hoy.getMonth() > mes - 1 ||
      (hoy.getMonth() === mes - 1 && hoy.getDate() >= dia);

    if (!yaCumplio) {
      edadCalculada--;
    }

    this.edad = edadCalculada;
    this.nombreCompleto =
      `${nombre} ${apaterno} ${amaterno}`;

    this.signoChino = this.obtenerSignoChino(
      nacimiento,
      anio
    );
  }

  obtenerSignoChino(fecha: Date, anio: number): string {
    const animales = [
      'Rata', 'Buey', 'Tigre', 'Conejo',
      'Dragon', 'Serpiente', 'Caballo', 'Cabra',
      'Mono', 'Gallo', 'Perro', 'Cerdo'
    ];

    const indice = (anio - 1900) % 12;
    const signo = animales[indice];

    const imagenes: Record<string, string> = {
      'Rata': 'https://www.hola.com/horizon/square/c3fd95a6ed3d-rata.jpg?im=Resize=(360),type=downsize',
      'Buey': 'https://www.hola.com/horizon/square/7887a34dbe29-toro.jpg?im=Resize=(360),type=downsize',
      'Tigre': 'https://www.hola.com/horizon/square/d5751e261157-tigre.jpg?im=Resize=(360),type=downsize',
      'Conejo': 'https://www.hola.com/horizon/square/f0bc634b25d6-conejo.jpg?im=Resize=(360),type=downsize',
      'Dragon': 'https://www.hola.com/horizon/square/1ad39743000c-dragon.jpg?im=Resize=(360),type=downsize',
      'Serpiente': 'https://www.hola.com/horizon/square/1fe221dfbc08-serpiente.jpg?im=Resize=(360),type=downsize',
      'Caballo': 'https://www.hola.com/horizon/square/69c67be121d1-caballo.jpg?im=Resize=(360),type=downsize',
      'Cabra': 'https://www.hola.com/horizon/square/27bb9ce86acc-cabra.jpg?im=Resize=(360),type=downsize',
      'Mono': 'https://www.hola.com/horizon/square/b9813f6ae312-mono.jpg?im=Resize=(360),type=downsize',
      'Gallo': 'https://www.hola.com/horizon/square/079deae851f8-gallo.jpg?im=Resize=(360),type=downsize',
      'Perro': 'https://www.hola.com/horizon/square/5c63ae92c3b5-perro.jpg?im=Resize=(360),type=downsize',
      'Cerdo': 'https://www.hola.com/horizon/square/8e0bdf4d9f41-cerdo.jpg?im=Resize=(360),type=downsize'
    };

    this.imagenSigno = imagenes[signo];

    return signo;
  }

}
