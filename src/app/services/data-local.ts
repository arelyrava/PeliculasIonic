import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  private _storage: Storage | null = null;
  peliculas: PeliculaDetalle[] = [];

  constructor(
    private storage: Storage,
    private toastCtrl: ToastController
  ) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    await this.cargarFavoritos();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }

  async guardarPelicula(pelicula: PeliculaDetalle): Promise<boolean> {
    let existe = false;
    let mensaje = '';

    const peliExistente = this.peliculas.find(p => p.id === pelicula.id);

    if (peliExistente) {
      this.peliculas = this.peliculas.filter(p => p.id !== pelicula.id);
      existe = true;
      mensaje = 'Removido de favoritos';
    } else {
      this.peliculas.push(pelicula);
      mensaje = 'Agregada a favoritos';
    }

    await this.presentToast(mensaje);
    await this._storage?.set('peliculas', this.peliculas);

    return !existe; // true = agregada, false = removida
  }

  async cargarFavoritos() {
    const peliculas = await this._storage?.get('peliculas');
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula(id: number): Promise<boolean> {
    console.log(id);
    id = Number(id);
    console.log(id);
    await this.cargarFavoritos();
    const existe = this.peliculas.find(peli => peli.id === id);
    return (existe) ? true : false;
  }
}
