import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MovieApiServiceService } from 'src/app/core/service/movie-api-service.service';
import { UserService } from 'src/app/auth/service/user.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { MovieInterface } from '../../model/movie-interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imageUrl = environment.imageBaseUrl;
  myMovies: MovieInterface[] = [];
  showMore: boolean[] = [];
  loading: boolean = true;

  currentPage: number = 0;
  pageSize: number = 6;
  totalPages: number = 1;
  constructor(private movieService: MovieApiServiceService, private router: Router) { }

  // Declare environment as a public property
//   environment = environment;
//   isPageReloaded: boolean = false; // Variable to track if the page is reloaded
//
//   constructor(private service: MovieApiServiceService,
//               private title:Title,
//               private userService: UserService)
//     {
//     this.title.setTitle('Home - IMDB');
//    }
//
//   trendingMovieResult: any = [];
//   comedyMovieResult: any = [];
//   thrillerMovieResult: any = [];

  ngOnInit(): void {
    this.getMovies();

//     const isReloaded = localStorage.getItem('isPageReloaded');
//     this.isPageReloaded = true; // Variable to track if the page is reloaded
//
//     this.userService.isLogging();
//     this.userService.isLoggingIn = true;
//     this.userService.isLoggedIn();
//
//     this.trendingData();
//     this.comedyMovie();
//     this.thrillerMovie();
  }

getMovies(){
      this.movieService.getMovies(this.currentPage, this.pageSize).subscribe((movies) => {
      this.myMovies = movies;
      this.loading = false;
      this.showMore = new Array<boolean>(this.myMovies.length).fill(false);
    },
    (error)=>{
      this.loading = true;
    });
 }
  onMovieClicked(id: number) {
    this.router.navigate(['Movie', id]);
  }

    nextPage() {
      this.currentPage++;
      this.getMovies();
    }

    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.getMovies();
      }
    }

//   trendingData() {
//         if ((this.service.trendingMovieApiData()) instanceof Observable) {
//       this.service.trendingMovieApiData().subscribe((result) => {
//       console.log(result, 'trendingresult#');
//       this.trendingMovieResult = result.results;
//     });
//    }
//    else console.error('TrendingMovieData did not return an Observable');
//   }
//
//   // comedy
//   comedyMovie() {
//
//     if ((this.service.fetchComedyMovies()) instanceof Observable) {
//         this.service.fetchComedyMovies().subscribe((result) => {
//         this.comedyMovieResult = result.results;
//       });
//     } else console.error('fetchComedyMovies did not return an Observable');
//
//   }
//
//   // thriller
//   thrillerMovie() {
//
//       if (this.service.fetchThrillerMovies() instanceof Observable) {
//         this.service.fetchThrillerMovies().subscribe((result) => {
//           this.thrillerMovieResult = result.results;
//         });
//       } else console.error('fetchThrillerMovies did not return an Observable');
//
//   }

}
