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

   baseUrl = environment.backendApi;

getMovies(page: number, size: number): Observable<MovieInterface[]> {
    const url = this.baseUrl;

    const token = this.retrieveToken();

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    // Include headers in the HTTP request
  return this.http.get(url, { headers, params }).pipe(
    map((response: any) => response.content as MovieInterface[]) // Extract 'content' property
  );

  }

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
