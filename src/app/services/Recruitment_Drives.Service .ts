import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Recruitment_Drives_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata

private extractData(res: Response)
{
let body = res;
return body || { };
}


Save_Recruitment_Drives(Recruitment_Drives_) {
    return this.http.post(
        environment.BasePath + "Recruitment_Drives/Save_Recruitment_Drives/",
        Recruitment_Drives_
    );
}

Search_Recruitment_Drives(Is_Date_ ,FromDate_ ,ToDate_ ,Branch_Id_,
    Pointer_Start_,Pointer_Stop_,Page_Length_): Observable<any> 
{   
    var Search_Data = {'Is_Date_': Is_Date_, 'FromDate_': FromDate_, 'ToDate_': ToDate_,'Branch_Id_':Branch_Id_,
    'Pointer_Start_':Pointer_Start_,'Pointer_Stop_':Pointer_Stop_,'Page_Length_':Page_Length_
    }
    return this.http.get(environment.BasePath + 'Recruitment_Drives/Search_Recruitment_Drives/', { params: Search_Data });
}
Delete_Recruitment_Drives(Recruitment_Drives_Id)
{
 return this.http.get(environment.BasePath +'Recruitment_Drives/Delete_Recruitment_Drives/'+Recruitment_Drives_Id);
}


                
}

