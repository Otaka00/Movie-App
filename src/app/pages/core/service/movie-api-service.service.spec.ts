import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieApiServiceService } from './movie-api-service.service';

describe('MovieApiServiceService', () => {
  let service: MovieApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
     imports: [HttpClientTestingModule], // Include HttpClientTestingModule
     providers: [MovieApiServiceService], // Provide the service
      });
    service = TestBed.inject(MovieApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
