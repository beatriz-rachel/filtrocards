import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SearchContent } from '../domain/search-content';
import { Observable } from 'rxjs';

@Injectable()
export class SearchContentService {

constructor(private http: HttpClient) { }

public obter() {
    return this.http.get('http://5d433408bc64f90014a57af9.mockapi.io/infos');
}

}
