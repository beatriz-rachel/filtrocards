import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { SearchContent } from '../domain/search-content';
import { Observable } from 'rxjs';


@Injectable()
export class SearchContentService {

constructor(private http: HttpClient) { }

public obter(): Observable<HttpResponse<SearchContent>>  {
    return this.http.get<HttpResponse<SearchContent>>('http://5d433408bc64f90014a57af9.mockapi.io/infos');
}

}
