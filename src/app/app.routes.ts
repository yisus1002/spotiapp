import { Routes, RouterModule } from '@angular/router';
import { ArtistaComponent } from './componets/artista/artista.component';
// import { NgModule } from '@angular/core';

import { HomeComponent} from './componets/home/home.component';
import { SearchComponent } from './componets/search/search.component'; 

export const ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'search', component: SearchComponent }, 
    { path: 'artist/:id', component: ArtistaComponent }, 
    { path: '', pathMatch :'full', redirectTo: 'home'}, 
    { path: '**', pathMatch :'full', redirectTo: 'home'}, 
];


// @NgModule({
//     imports: [RouterModule.forChild(routes)],
//     exports: [RouterModule]
// })
// export class FeatureRoutingModule {}
