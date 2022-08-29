import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent   {
  // paises:any[] = [];
  nuevasCanciones: any[]=[];

  loading: boolean = false;
  error: boolean = false;
  mensajeError: String='';

  constructor(  private http:HttpClient,   private Spotify_Service:SpotifyService) { 
    // this.http.get('https://restcountries.com/v3.1/lang/spa')
    // .subscribe( (data:any) => {
    //   this.paises=data;
    //   console.log(data)
    //   console.log(this.paises)
    // })
    this.Spotify_Service.getToken()
    this.loading = true;

    setTimeout(() => {
      this.Spotify_Service.getNewReleases()
      .subscribe((data:any) => {
        this.nuevasCanciones=data ;
        this.loading=false;
        // console.log(data.albums.items)
        console.log(this.nuevasCanciones)
      
      }, (err) => {
        this.error= true;
        this.loading=false;
        this.mensajeError=err.error.error.message;
      });
    }, 1000);
  }
 
}
