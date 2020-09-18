import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputDataComponent } from './input-data/input-data.component';
import { DisplayDataComponent } from './display-data/display-data.component';

const routes: Routes = [
  {
    path: '',
    component: InputDataComponent
  },
  {
    path: 'patient/:id',
    component: DisplayDataComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
