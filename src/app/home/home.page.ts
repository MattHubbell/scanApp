import { Component } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { NgxXml2jsonService } from 'ngx-xml2json';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  baseUrl = environment.baseUrl;
  personID: string;
  memberList: Object[];
  isLoading: boolean;
  errorMessage: string;
  rawData: string;

  constructor(private httpClient: HttpClient,
              private xml2json: NgxXml2jsonService) {
    this.isLoading = false;
    this.personID = '';
    this.errorMessage = '';
  }

  onClick() {
    if (this.personID.length === 0) {
          return;
    }

    this.isLoading = true;
    this.memberList = null;
    this.errorMessage = '';
    this.rawData = '';
    const headers = new HttpHeaders();
    const params = new HttpParams()
      .set('key', 'SQT')
      .set('custID', this.personID)
      .set('firstName', '')
      .set('lastName', '')
      .set('email', '')
      .set('city', '')
      .set('numberOfRecords', '');

    const options = { headers: headers, responseType: 'text', params: params};

    this.getData(options).subscribe(
      data => {
        console.log(data);
        this.rawData = String(data);
        const users = this.formatData(data);
        if (users !== '') {
          this.memberList = users.Users;
          console.log(this.memberList.length);
        } else {
          this.errorMessage = 'Record not found';
        }
        this.isLoading = false;
        // this.numberOfRecords = this.memberList.length;
        // const d2 = new Date();
        // this.endTime = d2.getTime();
        // let difference_ms = this.endTime - this.startTime;
        // difference_ms = difference_ms / 1000;
        // const seconds = Math.floor(difference_ms % 60);
        // this.queryTime = (seconds).toString() + ' Seconds';
      }, error => {
        console.log(error);
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    );
  }

  getData(options: any) {
    const url = this.baseUrl + '/CDSintegration.asmx/CustomerInfo3';
    return this.httpClient.get(url, options)
    // return this.httpClient.get('https://direct.aacc.org/webservices/CDSintegration.asmx/CustomerInfo3', options)
    .pipe(
      tap(
          data => data,
          error => error
        )
      );
  }

  formatData(data: any) {
    const parser = new DOMParser();
    const body = parser.parseFromString(data, 'text/xml');
    const bodyobj = this.xml2json.xmlToJson(body);
    const xml = parser.parseFromString(bodyobj['string'], 'text/xml');
    const obj = this.xml2json.xmlToJson(xml);
    const req = /\{\}/gi;
    const rea = /:\{/gi;
    const reb = /\[{"User":/gi;
    const rec = /\}\}\}/gi;
    const red = /\}\}/gi;
    let str = JSON.stringify(obj).replace(req, '""');
    str = str.replace(rea, ':[{');
    str = str.replace(reb, '');
    str = str.replace(rec, '}]}');
    str = str.replace(red, '}');
    try {
      const arr = JSON.parse(str);
      return arr;
    } catch {
      return '';
    }
  }
}
