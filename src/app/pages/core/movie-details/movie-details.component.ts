  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute } from '@angular/router';
  import { MovieApiServiceService } from 'src/app/pages/core/service/movie-api-service.service';
  import { Title, Meta } from '@angular/platform-browser';
  import { environment } from 'src/environment/environment';

  @Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.css']
  })
  export class MovieDetailsComponent implements OnInit {

    // Declare environment as a public property
    environment = environment;

    constructor(private service:MovieApiServiceService,
    private router:ActivatedRoute,
    private title: Title,
    private meta: Meta)
    { }
    getMovieDetailResult:any;
    getMovieCastResult:any;

    ngOnInit(): void {

      this.router.paramMap.subscribe((params) => {
      let getParamId = params.get('id');
      console.log(getParamId,'getparamid#');

      this.getMovie(getParamId);
      this.getMovieCast(getParamId);
  });
    }

    getMovie(id:any){
          this.service.getMovieDetails(id).subscribe(async(result)=>{
          console.log(result,'getmoviedetails#');
          this.getMovieDetailResult = await result;
          this.title.setTitle(`${this.getMovieDetailResult?.original_title}`);
           this.meta.updateTag({name:'title',content:this.getMovieDetailResult?.original_title});
           this.meta.updateTag({name:'description',content:this.getMovieDetailResult?.overview});
      });
    }

    getMovieCast(id:any)
    {
      this.service.getMovieCast(id).subscribe((result)=>{
        console.log(result,'movieCast#');
        this.getMovieCastResult = result.cast;
      });
    }
  }
