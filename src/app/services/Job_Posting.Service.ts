import { Component, OnInit,Input,Injectable } from '@angular/core';
import { environment } from '../../environments/environment.js';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
@Injectable({
providedIn: 'root'
})
export class Job_Posting_Service {
constructor(private http: HttpClient)
{
const httpOptions = {
headers: new HttpHeaders({
'Content-Type':  'application/json'
})
};
}AnimationKeyframesSequenceMetadata
// Save_Job_Posting(Job_Posting_)
// {
// return this.http.post(environment.BasePath +'Job_Posting/Save_Job_Posting/',Job_Posting_);
// }
private extractData(res: Response)
{
let body = res;
return body || { };
}
//     Save_Job_Posting(Job_Posting_, ImageFile_Resume: File[]) {
//         const postData = new FormData();
        
//         if (Job_Posting_ != null) {
//             postData.append("Job_Posting_Id", Job_Posting_.Job_Posting_Id);
//             postData.append("Job_Code", Job_Posting_.Job_Code);
//             postData.append("Job_Title", Job_Posting_.Job_Title);
//             postData.append("Descritpion", Job_Posting_.Descritpion);
//             postData.append("Skills", Job_Posting_.Skills);
//             postData.append("No_Of_Vaccancy", Job_Posting_.No_Of_Vaccancy);
//             postData.append("Experience", Job_Posting_.Experience);
//             postData.append("Experience_Name", Job_Posting_.Experience_Name);
//             postData.append("Job_Location", Job_Posting_.Job_Location);
//             postData.append("Qualification", Job_Posting_.Qualification);
//             postData.append("Qualification_Name", Job_Posting_.Qualification_Name);
//             postData.append("Functional_Area", Job_Posting_.Functional_Area);
//             postData.append("Functional_Area_Name", Job_Posting_.Functional_Area_Name);
//             postData.append("Specialization", Job_Posting_.Specialization);
//             postData.append("Specialization_Name", Job_Posting_.Specialization_Name);
//             postData.append("Salary", Job_Posting_.Salary);
//             postData.append("Last_Date", Job_Posting_.Last_Date);
//             //debugger
//             postData.append("Company_Id", Job_Posting_.Company_Id);
//             postData.append("Company_Name", Job_Posting_.Company_Name);
//             postData.append("Address", Job_Posting_.Address);
//             postData.append("Contact_Name", Job_Posting_.Contact_Name);
//             postData.append("Contact_No", Job_Posting_.Contact_No);
//             postData.append("Email", Job_Posting_.Email);
//             postData.append("Address1", Job_Posting_.Address1);
//             postData.append("Address2", Job_Posting_.Address2);
//             postData.append("Address3", Job_Posting_.Address3);
//             postData.append("Address4", Job_Posting_.Address4);
//             postData.append("Pincode", Job_Posting_.Pincode);
//             postData.append("Status", Job_Posting_.Status);
//             postData.append("Logo", Job_Posting_.Logo);
//             postData.append("User_Id", Job_Posting_.User_Id); 
            
//             postData.append("Course_Id", Job_Posting_.Course_Id);
//             postData.append("Course_Name", Job_Posting_.Course_Name);  

//             postData.append("Gender_Id", Job_Posting_.Gender_Id);
//             postData.append("Gender_Name", Job_Posting_.Gender_Name);  
//         }
//         var i = 0;
//         if (ImageFile_Resume != undefined) {

//             for (const img of ImageFile_Resume) {
//                 postData.append("myFile", img);
//                 postData.append("ImageFile_Resume", i.toString());
//                 i = i + 1;
//             }
//         }
//   return this.http.post(environment.BasePath + 'Job_Posting/Save_Job_Posting', postData);
// }


Save_Job_Posting(Job_Posting_) {
    return this.http.post(
        environment.BasePath + "Job_Posting/Save_Job_Posting/",
        Job_Posting_
    );
}


Search_Job_Posting(Job_Code_ ,Job_id_ ,Job_Location_ ,Company_id_,
    Pointer_Start_,Pointer_Stop_,Page_Length_): Observable<any> 
{   
    var Search_Data = {'Job_Code_': Job_Code_, 'Job_id_': Job_id_, 'Job_Location_': Job_Location_,'Company_id_':Company_id_,
    'Pointer_Start_':Pointer_Start_,'Pointer_Stop_':Pointer_Stop_,'Page_Length_':Page_Length_
    }
    return this.http.get(environment.BasePath + 'Job_Posting/Search_Job_Posting/', { params: Search_Data });
}
Delete_Job_Posting(Job_Posting_Id)
{
 return this.http.get(environment.BasePath +'Job_Posting/Delete_Job_Posting/'+Job_Posting_Id);
}
Get_Job_Posting(Job_Posting_Id)
{
 return this.http.get(environment.BasePath +'Job_Posting/Get_Job_Posting/'+Job_Posting_Id);
}
Load_Job_Posting_Search_Dropdowns(Group_Id)
{
    return this.http.get(environment.BasePath + 'Student/Load_Student_Search_Dropdowns/' + Group_Id);
}
Load_Job_Posting_Dropdowns()
{
    return this.http.get(environment.BasePath + 'Candidate/Load_Candidate_Dropdowns/' );
}

Search_Company_Typeahead(Company_Name): Observable<any> {
    var Search_Data = { Company_Name: Company_Name };
    return this.http.get(
        environment.BasePath + "Student/Search_Company_Typeahead/",
        { params: Search_Data }
    );
}

Search_Job_Typeahead(Job_Title): Observable<any> {
    var Search_Data = { Job_Title: Job_Title };
    return this.http.get(
        environment.BasePath + "Student/Search_Job_Typeahead/",
        { params: Search_Data }
    );
}

Search_Jobposting_Summary(Is_Date_,Fromdate_, Todate_,Job_id_,Company_id_,Course_Id_,Pointer_Start_,Pointer_Stop_,Page_Length_
): Observable<any> {
    var Search_Data = {
        Is_Date_: Is_Date_,
        Fromdate_: Fromdate_,
        Todate_: Todate_,
        Job_id_: Job_id_,
        Company_id_: Company_id_,
        Course_Id_:Course_Id_,
        Pointer_Start_:Pointer_Start_,
        Pointer_Stop_:Pointer_Stop_,
        Page_Length_:Page_Length_
    };
    return this.http.get(
        environment.BasePath + "Job_Posting/Search_Jobposting_Summary/",
        { params: Search_Data }
    );
}

Search_Appliedcount_Details(Job_Posting_Id_,Job_Title_): Observable<any> {
    var Search_Data = { Job_Posting_Id_: Job_Posting_Id_ ,Job_Title_:Job_Title_};
    return this.http.get(environment.BasePath + "Job_Posting/Search_Appliedcount_Details/", {
        params: Search_Data,
    });
}

Search_Rejectedcount_Details(Job_Posting_Id_,Job_Title_): Observable<any> {
    var Search_Data = { Job_Posting_Id_: Job_Posting_Id_ ,Job_Title_:Job_Title_};
    return this.http.get(environment.BasePath + "Job_Posting/Search_Rejectedcount_Details/", {
        params: Search_Data,
    });
}

Get_Resumefilefor_Report(Student_Id_): Observable<any> {
    var Search_Data = { Student_Id_: Student_Id_};
    return this.http.get(environment.BasePath + "Job_Posting/Get_Resumefilefor_Report/", {
        params: Search_Data,
    });
}


Search_Student_Job_Report(Is_Date_,Fromdate_, Todate_,Student_Status_,Student_Name_,Offeredcount_,
    Blacklist_Status_,Activate_Status_,Fees_Status_,Search_Resume_Status_
    ): Observable<any> {
        var Search_Data = {
            Is_Date_: Is_Date_,
            Fromdate_: Fromdate_,
            Todate_: Todate_,
            Student_Status_: Student_Status_,
            Student_Name_: Student_Name_,
            Offeredcount_:Offeredcount_,
            Blacklist_Status_:Blacklist_Status_,
            Activate_Status_:Activate_Status_,
            Fees_Status_:Fees_Status_,
            Search_Resume_Status_:Search_Resume_Status_
            

        };
        return this.http.get(
            environment.BasePath + "Job_Posting/Search_Student_Job_Report/",
            { params: Search_Data }
        );
    }



    Search_Jobposting_Detailed_Report(Is_Date_,Fromdate_, Todate_,Company_,Job_,Student_Status_,Blacklist_Status_,Activate_Status_,Fees_Status_
        ): Observable<any> {
            var Search_Data = {
                Is_Date_: Is_Date_,
                Fromdate_: Fromdate_,
                Todate_: Todate_,
                Company_: Company_,
                Job_: Job_,
                Student_Status_:Student_Status_,
                Blacklist_Status_:Blacklist_Status_,
                Activate_Status_:Activate_Status_,
                Fees_Status_:Fees_Status_
    
            };
            return this.http.get(
                environment.BasePath + "Job_Posting/Search_Jobposting_Detailed_Report/",
                { params: Search_Data }
            );
        }
    


//     Save_Schedule_Interview(Interview_Schedule_Date_ ,temp_Applied_jobs_ ,Interview_Schedule_Description_ ,Login_User_,temp_Student_d): Observable<any> 
// {   //debugger
//     var Search_Data = {'Interview_Schedule_Date_': Interview_Schedule_Date_, 'temp_Applied_jobs_': temp_Applied_jobs_, 'Interview_Schedule_Description_': Interview_Schedule_Description_,'Login_User_':Login_User_,'temp_Student_d':temp_Student_d
//     }
//     return this.http.get(environment.BasePath + 'Job_Posting/Save_Schedule_Interview/', { params: Search_Data });
// }


Save_Schedule_Interview(Interview_Schedule_) {
    return this.http.post(
        environment.BasePath + "Job_Posting/Save_Schedule_Interview/",
        Interview_Schedule_
    );
}


Save_ReSchedule_Interview(Interview_Schedule_) {
    return this.http.post(
        environment.BasePath + "Job_Posting/Save_ReSchedule_Interview/",
        Interview_Schedule_
    );
}


Save_Mark_Placement(Placement_Schedule_) {
    return this.http.post(
        environment.BasePath + "Job_Posting/Save_Mark_Placement/",
        Placement_Schedule_
    );
}



// Save_Mark_Placement(Placement_Date_ ,temp_Applied_jobs_ ,Placement_Description_ ,Login_User_,temp_Student_d): Observable<any> 
// {   //debugger
//     var Search_Data = {'Placement_Date_': Placement_Date_, 'temp_Applied_jobs_': temp_Applied_jobs_, 'Placement_Description_': Placement_Description_,'Login_User_':Login_User_,'temp_Student_d':temp_Student_d
//     }
//     return this.http.get(environment.BasePath + 'Job_Posting/Save_Mark_Placement/', { params: Search_Data });
// }



// Save_Job_Posting(Job_Posting_){
//     //debugger
//     var data ={'Email':ClientEmail_Forgot}
//     return this.http.post(environment.BasePath +'Job_Posting/Save_Job_Posting/',data);
// }



Search_Job_Rejections(Is_Date_,Fromdate_, Todate_
    ): Observable<any> {
        var Search_Data = {
            Is_Date_: Is_Date_,
            Fromdate_: Fromdate_,
            Todate_: Todate_
            

        };
        return this.http.get(
            environment.BasePath + "Job_Posting/Search_Job_Rejections/",
            { params: Search_Data }
        );
    }


    Applied_Reject_Detaild_Report(Student_Id_
        ): Observable<any> {
            var Search_Data = {
                Student_Id_: Student_Id_
    
            };
            return this.http.get(
                environment.BasePath + "Job_Posting/Applied_Reject_Detaild_Report/",
                { params: Search_Data }
            );
        }
    


        History_Of_Interview_Schedule(Student_Id_
            ): Observable<any> {
                var Search_Data = {
                    Student_Id_: Student_Id_
        
                };
                return this.http.get(
                    environment.BasePath + "Job_Posting/History_Of_Interview_Schedule/",
                    { params: Search_Data }
                );
            }
        

        Search_Company_List_Report(Is_Date_,Fromdate_, Todate_,Company_id_,Pointer_Start_,Pointer_Stop_,Page_Length_
            ): Observable<any> {
                debugger
                var Search_Data = {
                    
                    Is_Date_: Is_Date_,
                    Fromdate_: Fromdate_,
                    Todate_: Todate_,
                    Company_id_: Company_id_,
                    Pointer_Start_:Pointer_Start_,
                    Pointer_Stop_:Pointer_Stop_,
                    Page_Length_:Page_Length_
                };
                return this.http.get(
                    environment.BasePath + "Job_Posting/Search_Company_List_Report/",
                    { params: Search_Data }
                );
            }
            
            Search_Interview_Scheduled_Summary(Is_Date_,Fromdate_, Todate_,Company_id_,Course_Id_,Pointer_Start_,Pointer_Stop_,Page_Length_
                ): Observable<any> {
                    var Search_Data = {
                        Is_Date_: Is_Date_,
                        Fromdate_: Fromdate_,
                        Todate_: Todate_,
                        Company_id_: Company_id_,
                        Course_Id_:Course_Id_,
                        Pointer_Start_:Pointer_Start_,
                        Pointer_Stop_:Pointer_Stop_,
                        Page_Length_:Page_Length_
                    };
                    return this.http.get(
                        environment.BasePath + "Job_Posting/Search_Interview_Scheduled_Summary/",
                        { params: Search_Data }
                    );
                }


                Search_Interview_Scheduled_Details(Job_id_,Company_Id_,Interview_Date_,Interview_Time_,course_id_
                    ): Observable<any> {
                        var Search_Data = {
                            Job_id_: Job_id_,
                            Company_Id_: Company_Id_,
                            Interview_Date_: Interview_Date_,
                            Interview_Time_: Interview_Time_,
                            course_id_:course_id_,
                           
                        };
                        return this.http.get(
                            environment.BasePath + "Job_Posting/Search_Interview_Scheduled_Details/",
                            { params: Search_Data }
                        );
                    }


                    Search_Placement_Report_New(Is_Date_,Fromdate_, Todate_,Trainer_Id_,Course_Id_,Pointer_Start_,Pointer_Stop_,Page_Length_
                        ): Observable<any> {
                            var Search_Data = {
                                Is_Date_: Is_Date_,
                                Fromdate_: Fromdate_,
                                Todate_: Todate_,
                                Trainer_Id_: Trainer_Id_,
                                Course_Id_:Course_Id_,
                                Pointer_Start_:Pointer_Start_,
                                Pointer_Stop_:Pointer_Stop_,
                                Page_Length_:Page_Length_
                            };
                            return this.http.get(
                                environment.BasePath + "Job_Posting/Search_Placement_Report_New/",
                                { params: Search_Data }
                            );
                        }



                        Search_Complaint_Details(Is_Date_,Fromdate_, Todate_,Status_,Login_User_,Pointer_Start_,Pointer_Stop_,Page_Length_
                            ): Observable<any> {
                                var Search_Data = {
                                    Is_Date_: Is_Date_,
                                    Fromdate_: Fromdate_,
                                    Todate_: Todate_,
                                    Status_: Status_,
                                    Login_User_:Login_User_,
                                    Pointer_Start_:Pointer_Start_,
                                    Pointer_Stop_:Pointer_Stop_,
                                    Page_Length_:Page_Length_
                                };
                                return this.http.get(
                                    environment.BasePath + "Job_Posting/Search_Complaint_Details/",
                                    { params: Search_Data }
                                );
                            }
                
}

