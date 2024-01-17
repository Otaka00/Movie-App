import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { MovieApiServiceService } from 'src/app/pages/core/service/movie-api-service.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { environment } from 'src/environment/environment';
import { DebugElement } from '@angular/core';

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

it('should fetch comedy movies on initialization', () => {
  const comedyMovies = [{ title: 'The Family Plan', id:1 }, { title: 'Freelance', id:2 }];

  // Simulate the service returning comedy movies
  movieApiServiceMock.fetchComedyMovies.and.returnValue(of({ results: comedyMovies }));

  fixture.detectChanges();

  // Verify that the component has received the comedy movies
  expect(component.comedyMovieResult).toEqual(comedyMovies);

  // Verify that the DOM has been updated with the comedy movie titles
  const comedyMovieElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.comedy-movie img'));
 // Expectation 1: Check the number of elements
  expect(comedyMovieElements.length).toBe(comedyMovies.length);

  // Expectation 2: Check the content of each element
  comedyMovieElements.forEach((element, index) => {
    // Adjust the selector based on your actual HTML structure
    const imageUrl = element.nativeElement.src;
    const routerLink = element.nativeElement.getAttribute('routerLink');

    expect(imageUrl).toBeTruthy();
    expect(imageUrl).toContain(environment.imageBaseUrl);
//     expect(imageUrl).toContain(comedyMovies[index].id.toString());

  });
  });

it('should fetch thriller movies on initialization', () => {
  const thrillerMovies = [{ title: 'The Dark Secret' }, { title: 'Edge of Fear' }];

  // Simulate the service returning thriller movies
  movieApiServiceMock.fetchThrillerMovies.and.returnValue(of({ results: thrillerMovies }));

  fixture.detectChanges();

  // Verify that the component has received the thriller movies
  expect(component.thrillerMovieResult).toEqual(thrillerMovies);

  // Verify that the DOM has been updated with the thriller movie titles
  const thrillerMovieElements = fixture.debugElement.queryAll(By.css('.thriller-movie img'));

  // Expectation 1: Check the number of elements
  expect(thrillerMovieElements.length).toBe(thrillerMovies.length);

  // Expectation 2: Check the content of each element
  thrillerMovieElements.forEach((element, index) => {
    // Adjust the selector based on your actual HTML structure
    const imageUrl = element.nativeElement.getAttribute('src');

    expect(imageUrl).toBeTruthy();
    expect(imageUrl).toContain(environment.imageBaseUrl);

  });
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
