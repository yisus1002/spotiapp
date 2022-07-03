import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styles: [
  ]
})
export class TarjetasComponent  {

  @Input() items: any[]=[];

  constructor(private router: Router) { }
  

  verArtista( item: any ) {
    let artistaid:any;
    if(item.type === 'artist'){
      artistaid =item.id;
    }else{
      artistaid =item.artists[0].id;
    }
    // console.log(artistaid);
    this.router.navigate(['/artist', artistaid]);
  }
}
