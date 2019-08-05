import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SearchContentService } from './services/search-content.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchContent } from './domain/search-content';
import { finalize } from 'rxjs/operators';


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
  public loading = false;

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
        this.loading = true;
        this.searchContentService
          .obter()
          .pipe(finalize(() => { this.loading = false; }))
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
    filter = filter.trim().toUpperCase();

    this.list.forEach(element => {
      if (element.Title.toUpperCase().indexOf(filter) !== -1 || element.Description.toUpperCase().indexOf(filter) !== -1) {
        this.listFiltered.push(element);
      }
    });
  }

  public getListFiltered(): SearchContent[] {
    return this.listFiltered;
  }
}
