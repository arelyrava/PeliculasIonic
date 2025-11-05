import { Component } from '@angular/core';
import { MoviesServices } from '../services/movies.services';
import { Pelicula } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  textoBuscar = '';
  buscando = false;
  peliculas: Pelicula [] = [];
  ideas: string[] = ['Culpa Nuestra','Zona de Caza'];

  constructor( private moviesServices: MoviesServices,
                private modalCtrl: ModalController
  ){

  }

  buscar(valor: string) {
    this.textoBuscar = valor;


    //console.log(valor);
    this.buscando = true;

    this.moviesServices.buscarPeliculas(valor)
      .subscribe( resp => {
        console.log('Películas encontradas:', resp);
        this.peliculas = resp['results'];
        this.buscando = false;
      });

}


  async detalle( id: string) {
    const modal = await this.modalCtrl.create({
            component: DetalleComponent,
            componentProps: {
              id
            }
          });
          modal.present();

  }

}
