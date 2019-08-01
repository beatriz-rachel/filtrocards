import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SearchContentService } from './services/search-content.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SearchContentService]
})
export class AppComponent implements OnInit {
  public sub: any;
  title = 'filtrocards';

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
          });
      });
  }
}
