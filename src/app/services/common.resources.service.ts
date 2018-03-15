import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Resource } from '../beans/resource';
import { Observable } from 'rxjs/Observable';
import { Page } from '../beans/page';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable()
export class CommonResourcesService {

  constructor(private http: HttpClient) { }

  getFromUrl<T extends Resource>(resourceUrl: string): Observable<T> {
    return this.http.get<T>(resourceUrl, httpOptions);
  }

  getArrayFromUrl<T extends Resource>(resourceUrl: string): Observable<Page<T>> {
    return this.http.get<Page<T>>(resourceUrl, httpOptions);
  }

  getResources<T extends Resource>(page: Page<T>): T[] {
    if (page) {
      // Strange hack to retrieve first element of page._embedded
      for (var key in page._embedded) {
        return page._embedded[key];
      }
    } else {
      return null;
    }
  }

}
