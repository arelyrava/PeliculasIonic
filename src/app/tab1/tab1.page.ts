import { Component, OnInit } from '@angular/core';
import { MoviesServices } from '../services/movies.services';
import { RespuestaMDB, Pelicula } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit{

  peliculasRecientes: Pelicula[] = [];
  populares: Pelicula[] = [];



  constructor(private moviesServices: MoviesServices) {}


  ngOnInit() {
    this.moviesServices.getFeature()
    .subscribe ( resp => {
      this.peliculasRecientes = resp.results;

    });

    this.getPopulares();

  }


  cargarMas(){
    this.getPopulares();

  }

  getPopulares(){
    this.moviesServices.getPopulares()
    .subscribe( resp => {
      //console.log('Populares', resp);
      const arrTemp = [ ...this.populares, ...resp.results];
      this.populares = arrTemp;

  });


  }
}
