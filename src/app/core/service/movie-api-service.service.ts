import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { UserService } from 'src/app/auth/service/user.service';
import { MovieInterface } from '../../model/movie-interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieApiServiceService {

  constructor(private http: HttpClient, private userService:UserService) { }

//   private baseurl = environment.apiUrl;
//   private apikey = environment.apiKey;

//   // trendingmovieapidata
//   trendingMovieApiData(): Observable<any> {
//     return this.http.get(`${this.baseurl}/trending/movie/day?api_key=${this.apikey}`);
//   }
//
//   // getmoviedetails
//   getMovieDetails(data: any): Observable<any> {
//     return this.http.get(`${this.baseurl}/movie/${data}?api_key=${this.apikey}`)
//   }
//
//   // getMovieCast
//   getMovieCast(data: any): Observable<any> {
//     return this.http.get(`${this.baseurl}/movie/${data}/credits?api_key=${this.apikey}`)
//   }
//
//   // comedy
//   fetchComedyMovies(): Observable<any> {
//     return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=35`);
//   }
//   // thriller
//   fetchThrillerMovies(): Observable<any> {
//     return this.http.get(`${this.baseurl}/discover/movie?api_key=${this.apikey}&with_genres=53`);
//   }

   baseUrl = environment.backendApi;

getMovies(): Observable<MovieInterface[]> {
    const url = this.baseUrl;

    const token = this.retrieveToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
// page: number = 0, size: number = 18
//     const params = new HttpParams()
//       .set('page', page.toString())
//       .set('size', size.toString());

    // Include headers in the HTTP request
//     return this.http.get<MovieInterface[]>(url, { headers }); // should add params
  return this.http.get(url, { headers }).pipe(
    map((response: any) => response.content as MovieInterface[]) // Extract 'content' property
  );

  }
//   getMoviesForLanding(): Observable<MovieInterface[]> {
//     const url = this.landingUrl;
//
//     // Include headers in the HTTP request
//     return this.http.get<MovieInterface[]>(url);
//   }

  getMovie(movieId: number): Observable<MovieInterface> {
    const url = `${this.baseUrl}/${movieId}`;

    const token = this.retrieveToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<MovieInterface>(url, { headers });
  }

  private retrieveToken(): string | null {
    return this.userService.getAuthToken();
  }

}
