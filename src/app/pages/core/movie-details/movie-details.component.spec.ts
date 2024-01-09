import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailsComponent } from './movie-details.component';
import { MovieApiServiceService } from 'src/app/pages/core/service/movie-api-service.service';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let mockActivatedRoute: ActivatedRoute;
  let mockMovieApiService: MovieApiServiceService;

  beforeEach(() => {
    mockActivatedRoute = {
      paramMap: of({ get: (id: string) => '664341' }),
    } as any;

    mockMovieApiService = {
      getMovieDetails: jasmine.createSpy('getMovieDetails').and.returnValue(of('During a bitter 1964 Massachusetts winter, young secretary Eileen becomes enchanted by Rebecca Saint John, the glamorous new counselor at the prison where she works. Their budding friendship takes a twisted turn when Rebecca reveals a dark secret — throwing Eileen onto a sinister path.')),
      getMovieCast: jasmine.createSpy('getMovieCast').and.returnValue(of(/* mock data */)),
    } as any;

    TestBed.configureTestingModule({
      declarations: [MovieDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: MovieApiServiceService, useValue: mockMovieApiService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movie details, and cast on ngOnInit', inject(
    [ActivatedRoute],
    (activatedRoute: ActivatedRoute) => {
      spyOn(activatedRoute.paramMap, 'subscribe').and.callThrough();
      component.ngOnInit();

      expect(activatedRoute.paramMap.subscribe).toHaveBeenCalled();
      expect(mockMovieApiService.getMovieDetails).toHaveBeenCalledWith('664341');
      expect(mockMovieApiService.getMovieCast).toHaveBeenCalledWith('664341');
    }
  ));
});
