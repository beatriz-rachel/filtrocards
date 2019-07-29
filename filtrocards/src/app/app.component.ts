import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'filtrocards';

  public frmBusca: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.frmBusca = this.fb.group({
      filtro: this.fb.control(''),
    });
  }

  public teste(): void {
    console.log('clicou');
  }
}
