import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SearchContentService } from './services/search-content.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchContent } from './domain/search-content';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SearchContentService]
})
export class AppComponent implements OnInit {
  public sub: any;
  title = 'filtrocards';  
  public list: SearchContent[] = [];

  public frmSearch: FormGroup;

  constructor(
    private fb: FormBuilder,
    private searchContentService: SearchContentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.frmSearch = this.fb.group({
      filter: this.fb.control(''),
    });
  }

  public teste(): void {
    let filter = this.frmSearch.get('filter').value;
    console.log('filter: ' + filter);

    this.sub = this.activatedRoute.params.subscribe(params => {
        this.searchContentService
          .obter()
          .subscribe(response => {
            console.log(response);
            this.toModel(response);
          });
      });
  }

  public toModel(response: any): SearchContent[] {
    response.forEach(element => {
      let newElement = new SearchContent();
      newElement.Id = element.Id;
      newElement.Title = element.Title;
      newElement.Description = element.Description;
      this.list.push(newElement);
    });

    return this.list;
  }
}
