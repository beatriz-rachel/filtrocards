import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'filtrocards';

  public frmSearch: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.frmSearch = this.fb.group({
      filter: this.fb.control(''),
    });
  }

  public teste(): void {
    console.log('clicou');
  }
}
