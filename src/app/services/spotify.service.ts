import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//filtrar informacion
import { finalize, map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  token:any='';

  constructor(private http:HttpClient) { 
    console.log('servicio listo')
    this.getToken();
    setInterval(()=>{
      this.getToken();
    },3600000)
    console.log(this.token)
  }
  postAccesToken():Observable<any>{
    const payload = new HttpParams()
  .set('grant_type', 'client_credentials')
  .set('client_id', '009d42a7c8834de8b5777d6acbd9012b')
  .set('client_secret', '7711aa9d5a7341749bead459d4538e12');
  return this.http.post<any>(`https://accounts.spotify.com/api/token`, payload).pipe(map((resp: any) => resp));
  }
   getToken(){
   this.postAccesToken()
    .pipe(finalize(()=>{
      const localS=(localStorage.getItem('token'));
      localStorage.setItem('token', JSON.stringify(this.token))
      if(localS){
        this.token=JSON.parse(localS!)
      }
      // this.token=JSON.parse(localS!)
    }))
    .subscribe({
      next: (data:any)=>{
        this.token=(data.access_token)
      },
      error:(error:any)=>{
        console.log(error)
      },
    })
  }

  getquery(query:String){
    const token= (localStorage.getItem('token'));
    const url = `https://api.spotify.com/v1/${query}`;

    const headers =new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(token!)}` 
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
