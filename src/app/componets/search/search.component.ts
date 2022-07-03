import { Component } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent   {

  artistas: any[] = [];
  loading: boolean = false;



  constructor(private Spotify_Service: SpotifyService) { 

   
  }
  
  buscar(termino: String){
    this.loading = true;
    // console.log(termino);
    this.Spotify_Service.getArtista(termino)
    .subscribe((data:any) =>{
      this.artistas=data ;
      this.loading = false;
      console.log(data )
    })

  }
 

}
