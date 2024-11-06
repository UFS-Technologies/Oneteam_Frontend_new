import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Injectable({
providedIn: 'root'
})
export class Syllabus_Import_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
Save_Syllabus_Import(Syllabus_Import_)
{
return this.http.post(environment.BasePath +'Syllabus_Import/Save_Syllabus_Import/',Syllabus_Import_);}


private extractData(res: Response)
{
let body = res;
return body || { };
}


fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
fileExtension = '.xlsx';
public exportExcel(jsonData: any[], fileName: string): void 
{
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
  const wb: XLSX.WorkBook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  this.saveExcelFile(excelBuffer, fileName);
}
private saveExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.fileType });
   FileSaver.saveAs(data, fileName + this.fileExtension);
}



Search_Syllabus_Import(From_Date,To_Date,look_In_Date_Value):Observable<any>
{
 return this.http.get(environment.BasePath +'Syllabus_Import/Search_Syllabus_Import_Import/'+From_Date+'/'+To_Date + '/'+look_In_Date_Value);}


//   Save_Syllabus_Import(Syllabus_Import_Details)
// {
     
// return this.http.post(environment.BasePath +'Syllabus_Import/Save_Syllabus_Import_Import/',Syllabus_Import_Details);}

Delete_Syllabus_Import(Syllabus_Import_Import_Id)
{
 return this.http.get(environment.BasePath +'Syllabus_Import_Import/Delete_Syllabus_Import_Import/'+Syllabus_Import_Import_Id);}

 Get_Syllabus_Import(Import_Master_Id):Observable<any>
 {
  return this.http.get(environment.BasePath +'Syllabus_Import/Get_Syllabus_Import_Import/'+Import_Master_Id);
 }
 Get_Menu_Status(Menu_Id_,Login_User_)
 {
        return this.http.get(environment.BasePath + 'Student/Get_Menu_Status/' + Menu_Id_+'/'+Login_User_);
}


}


