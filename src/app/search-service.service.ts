import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from "@angular/common/http";


export class SearchItem {
  constructor(
    public name: string,
    public artist: string,
    public link: string,
    public thumbnail: string,
    public artistId: string
  ) { }
}

@Injectable({
  providedIn: 'root'
})

export class SearchServiceService {

  constructor(private http: HttpClient) {
    this.results = [];
    this.loading = false;
  }

  apiRoot: string = 'https://itunes.apple.com/search';
  results: SearchItem[];
  loading: boolean;

  search(term: string) {
    let promise = new Promise((resolve, reject) => {
      let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
      this.http.get(apiURL)
        .toPromise()
        .then(
          (res: any) => {
            //console.log(res);
            this.results = res.results.map(item => {
              return new SearchItem(
                item.trackName,
                item.artistName,
                item.trackViewUtl,
                item.artworkUrl30,
                item.artistId
              );
            })
          },
          msg => {
            reject();
          }
        )
    });
    return promise;
  }

}
