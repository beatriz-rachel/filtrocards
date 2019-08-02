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
  public listFiltered: SearchContent[] = [];

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
            this.list.length = 0;
            this.listFiltered.length = 0;

            this.toModel(response);

            this.filter(filter);
            
          });
      });
  }

  public toModel(response: any): void {
    response.forEach(element => {
      let newElement = new SearchContent();
      newElement.Id = element.Id;
      newElement.Title = element.Title;
      newElement.Description = element.Description;
      this.list.push(newElement);
    });
  }

  public filter(filter: string): void {
    filter = filter.trim();

    this.list.forEach(element => {
      if (element.Title.indexOf(filter) !== -1 || element.Description.indexOf(filter) !== -1) {
        element.Show = true;
        this.listFiltered.push(element);
        console.log(this.listFiltered);
      } else {
        element.Show = false;
        this.listFiltered.push(element);
        console.log(this.listFiltered);
      }
    });

    // console.log(this.listFiltered.filter(x => x.Show = true));
  }

  public getListFiltered(): SearchContent[] {
    return this.listFiltered.filter(x => x.Show = true);
  }
}
