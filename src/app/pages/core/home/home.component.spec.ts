import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { MovieApiServiceService } from 'src/app/pages/core/service/movie-api-service.service';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let movieApiServiceMock: jasmine.SpyObj<MovieApiServiceService>;

  beforeEach(() => {
    movieApiServiceMock = jasmine.createSpyObj('MovieApiServiceService', ['trendingMovieApiData', 'fetchComedyMovies', 'fetchThrillerMovies']);

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: MovieApiServiceService, useValue: movieApiServiceMock },
      ],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch trending movies on initialization', () => {
    const trendingMovies = [{ title: 'La sociedad de la nieve' }, { title: 'Foe' }];

    // Simulate the service returning trending movies
    movieApiServiceMock.trendingMovieApiData.and.returnValue(of({ results: trendingMovies }));

    fixture.detectChanges();

    // Verify that the component has received the trending movies
    expect(component.trendingMovieResult).toEqual(trendingMovies);
  });

it('should fetch comedy movies on initialization', () => {
  const comedyMovies = [{ title: 'The Family Plan' }, { title: 'Freelance' }];

  // Simulate the service returning comedy movies
  movieApiServiceMock.fetchComedyMovies.and.returnValue(of({ results: comedyMovies }));

  fixture.detectChanges();

  // Verify that the component has received the comedy movies
  expect(component.comedyMovieResult).toEqual(comedyMovies);
  // Verify the length of comedy movies data
  expect(component.comedyMovieResult.length).toBeGreaterThan(0);
  // Verify that comedy movies data is defined
  expect(component.comedyMovieResult).toBeDefined();
    });

});
