import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: [
  ]
})
export class ArtistaComponent  {
  artista:any = {}
  topTrack:any[] =[] ;
  loading: boolean = false;
  constructor(private router: ActivatedRoute,   
              private Spotify_Service: SpotifyService ) { 

    this.router.params.subscribe((artista:any)=>{
      this.loading = true;
     this.getArtistaa(artista['id'])
     this.getTopTracks(artista['id'])
    }) 

  }
 
  getArtistaa(id :String){
    this.Spotify_Service.getArtist(id)
      .subscribe(data=>{
        this.artista=data;
        console.log(this.artista)
        this.loading=false
      })
  }

  getTopTracks(id :String){
    this.Spotify_Service.getTopTracks(id)
    .subscribe(top=>{
      this.topTrack=top;
      console.log(this.topTrack)
    })

  }

}
