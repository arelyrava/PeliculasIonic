
import { Component, OnInit } from '@angular/core';
import { Genre, PeliculaDetalle } from '../interfaces/interfaces';
import { DataLocalService } from '../services/data-local';
import { MoviesServices } from '../services/movies.services';
import { DetalleComponent } from '../components/detalle/detalle.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];
  favoritoGenero: { genero: string; pelis: PeliculaDetalle[] }[] = [];

  constructor(
    private dataLocal: DataLocalService,
    private moviesServices: MoviesServices,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
    await this.cargarDatos();
  }

  // Se ejecuta cada vez que entras a la pestaña
  async ionViewWillEnter() {
    await this.cargarDatos();
  }

  async cargarDatos() {
    this.peliculas = await this.dataLocal.cargarFavoritos();
    this.generos = await this.moviesServices.cargarGeneros();
    console.log('🎬 Películas favoritas cargadas:', this.peliculas);
    this.pelisPorGenero(this.generos, this.peliculas);
  }

  pelisPorGenero(generos: Genre[], peliculas: PeliculaDetalle[]) {
    this.favoritoGenero = generos.map(genero => ({
      genero: genero.name,
      pelis: peliculas.filter(peli =>
        peli.genres?.some(g => g.id === genero.id)
      )
    }));

    console.log('📂 Favoritos por género:', this.favoritoGenero);
  }

  async verDetalle(id: number) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: { id },
    });
    await modal.present();

    //  Refrescamos favoritos al cerrar el modal
    await modal.onDidDismiss();
    await this.cargarDatos();
  }
}
