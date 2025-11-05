import { Component, Input, OnInit } from '@angular/core';
import { MoviesServices } from '../../services/movies.services';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from 'src/app/services/data-local';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  standalone: false,
})
export class DetalleComponent  implements OnInit {

  @Input() id!: number;

  pelicula: PeliculaDetalle = {};
  actores: Cast[] =[];
  oculto = 150;
  estrella = 'star-outline';

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spacebetween: -5

  };


  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: 10
  };


  constructor( private moviesServices: MoviesServices,
                private modalCtrl: ModalController,
                private dataLocal: DataLocalService
  ) { }

   async ngOnInit() {
    //console.log('ID', this.id);

    const existe = await this.dataLocal.existePelicula( this.id );
    console.log('Detalle component existe:', existe);

    this.dataLocal.existePelicula( this.id );
        this.dataLocal.existePelicula(this.id)
        .then((existe: boolean) => {
          this.estrella = (existe) ? 'star' : 'star-outline';
        });


    this.moviesServices.getPeliculaDetalle( this.id )
      .subscribe( resp => {
        console.log(resp);
        this.pelicula = resp;
      });

       this.moviesServices.getActoresPelicula( this.id )
      .subscribe( resp => {
        console.log(resp);
        this.actores = resp.cast;
  });

  }


  regresar (){
    this.modalCtrl.dismiss();
  }

      async favorito() {
        const existe = await this.dataLocal.guardarPelicula(this.pelicula);
        this.estrella = (existe) ? 'star' : 'star-outline';
      }

}
