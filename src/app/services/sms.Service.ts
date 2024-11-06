// src/app/services/sms.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sms } from '../models/Sms';

@Injectable({
  providedIn: 'root'
})
export class SmsService {
  private apiUrl = 'https://sapteleservices.com/SMS_API/sendsms.php';

  constructor(private http: HttpClient) {}

  sendSms(sms: Sms): Observable<any> {
    debugger
    let params = new HttpParams()
      .set('username', sms.username)
      .set('password', sms.password)
      .set('mobile', sms.mobile)
      .set('message', sms.message)
      .set('sendername', sms.sendername)
      .set('routetype', sms.routetype.toString())
      .set('tid', sms.tid);

    if (sms.UC) {
      params = params.set('UC', sms.UC);
    }

    return this.http.get(this.apiUrl, { params });
  }

  Fees_Payment_Sms(sms: Sms): Observable<any> {
    debugger
    let params = new HttpParams()
      .set('username', sms.username)
      .set('password', sms.password)
      .set('mobile', sms.mobile)
      .set('message', sms.message)
      .set('sendername', sms.sendername)
      .set('routetype', sms.routetype.toString())
      .set('tid', sms.tid);

    if (sms.UC) {
      params = params.set('UC', sms.UC);
    }

    return this.http.get(this.apiUrl, { params });
  }



  

}
