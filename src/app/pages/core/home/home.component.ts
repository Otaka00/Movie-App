import { Component, OnInit } from '@angular/core';
import { MovieApiServiceService } from 'src/app/pages/core/service/movie-api-service.service';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from 'src/app/pages/auth/service/user.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Declare environment as a public property
  environment = environment;

  constructor(private service: MovieApiServiceService,
              private title:Title,
              private userService: UserService)
    {
    this.title.setTitle('Home - IMDB');
   }

  trendingMovieResult: any = [];
  comedyMovieResult: any = [];
  thrillerMovieResult: any = [];

  ngOnInit(): void {
    this.userService.isLogging();
    this.trendingData();
    this.comedyMovie();
    this.thrillerMovie();
  }

  trendingData() {
        if ((this.service.trendingMovieApiData()) instanceof Observable) {
      this.service.trendingMovieApiData().subscribe((result) => {
      console.log(result, 'trendingresult#');
      this.trendingMovieResult = result.results;
    });
   }
   else console.error('TrendingMovieData did not return an Observable');
  }

  // comedy
  comedyMovie() {

    if ((this.service.fetchComedyMovies()) instanceof Observable) {
        this.service.fetchComedyMovies().subscribe((result) => {
        this.comedyMovieResult = result.results;
      });
    } else console.error('fetchComedyMovies did not return an Observable');

  }

  // thriller
  thrillerMovie() {

      if (this.service.fetchThrillerMovies() instanceof Observable) {
        this.service.fetchThrillerMovies().subscribe((result) => {
          this.thrillerMovieResult = result.results;
        });
      } else console.error('fetchThrillerMovies did not return an Observable');

  }

}
