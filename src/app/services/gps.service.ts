import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, filter, debounceTime } from 'rxjs/operators';
import { Message } from '../interfaces/message';
import { Observable, timer } from 'rxjs';




@Injectable({
  providedIn: 'root'
})

export class GpsService {

  gpsData = [];

  constructor(private http: HttpClient) {

  }

  fetchtData() {
    const data = new Observable((observer) => {
      this.http.get('./assets/data.txt', { responseType: 'text' }).subscribe(values => observer.next(values));

    });

    return data.pipe(
      map((values: string) => this.parseArr(values.split('\n')))
    ).subscribe(values => {
      this.gpsData = values;
    });

  }

  getData() {

    let counter = 0;
    const observer = timer(200, 250).pipe(
      debounceTime(200),
      map(() => {
        counter > (this.gpsData.length + 1) ? counter = 0 : counter++;
        // console.log(this.gpsData[counter])
        return this.gpsData[counter];
      }));

    return observer;

  }


  parseArr(data): Array<Array<Message>> {

    const gpsArray = [];

    let counter = 0;
    let buf = [];
    let gsaArr = [];

    data.forEach(element => {

      if ((element.indexOf('$GPGSV') !== -1 || element.indexOf('$GPGSA') !== -1) && this.validateMessage(element.split('*'))) {

        element = element.split('*')[0].split(',');
        if (element.indexOf('$GPGSA') !== -1) {
          gsaArr = element.slice(3, 15).filter(x => x !== '');
          counter = 0;
        } else {

          buf.push(...this.parseToGSVPackage(element, gsaArr));

          const msgCount = element[1];
          const messageNumber = element[2];
          if (messageNumber === msgCount) {
            gpsArray.push(buf);
            buf = [];

          }

        }
      }
    });

    return gpsArray;

  }


  validateMessage(data) {
    let [str, checkSum] = data;
    str = str.substring(1, str.length);
    checkSum = checkSum.trim();
    const arr = [];

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < str.length; i++) {
      arr.push(str[i].charCodeAt(0));
    }

    let expectedSum = arr.reduce((sum, current) => {
      // tslint:disable-next-line: no-bitwise
      return sum ^ current;
    }, 0).toString(16).toUpperCase();

    if (expectedSum.length === 1) { expectedSum = '0' + expectedSum; }
    if (expectedSum === checkSum) { return true; }

    return false;
  }

  parseToGSVPackage(data: Array<string>, gsaArr: Array<string>): Array<Message> {

    data = data.slice(4);

    const arr = [];

    data.forEach((it, index) => {
      let type = 'GSV';

      if (index % 4 === 0) {
        let snr = +data[index + 3];

        if (gsaArr.filter(x => x === data[index]).length > 0) {
          type = 'GSA';
          snr = 0;
        }

        arr.push(
          {
            id: +data[index],
            type,
            elevation: +data[index + 1],
            azimuth: +data[index + 2],
            snr,
          }
        );

      }
    }
    );

    return arr;
  }

}

