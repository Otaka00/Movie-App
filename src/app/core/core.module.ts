// core.module.ts
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [HomeComponent, MovieDetailsComponent],
  imports: [CoreRoutingModule,CommonModule, RouterModule, CoreRoutingModule, ReactiveFormsModule, HttpClientModule, BrowserModule],
})
export class CoreModule {}
