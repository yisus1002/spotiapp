import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//filtrar informacion
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http:HttpClient) { 
    console.log('servicio listo')
  }

  getquery(query:String){
    const url = `https://api.spotify.com/v1/${query}`;

    const headers =new HttpHeaders({
      'Authorization': 'Bearer BQBz3rsm6YTQBFkYOCy48ZUbXr_xClGD8NMl_QnJhpSI2k2d-iyVhW8KsIWkogTpwEOSEkfLOHz-twXIRhSU2bvziLGkLkUr1tQI353Xz_Dtxe3QQ4c'
    }); 
    return this.http.get(url, {headers})
  } 
  getNewReleases(){ 
    return this.getquery('browse/new-releases?limit=20')
    .pipe(map((data :any)=> data['albums'].items ))  
  } 
  getArtista(termino: String){
    return this.getquery(`search?q=${termino}&type=artist&limit=15`)
    .pipe(map((data:any) => data['artists'].items )) 
  }

  getArtist(id: any){
    return this.getquery(`artists/${id}`)
    .pipe(map((data:any) => data )) 
  }

  getTopTracks(id: any){
    return this.getquery(`artists/${id}/top-tracks?country=us`)
    .pipe(map((data:any) => data['tracks'] )) 
  }
}
