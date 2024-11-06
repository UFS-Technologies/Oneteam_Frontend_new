
export class Job_Opening
{
    Job_Opening_Id :number;
    Job_Title :string; 
    Comapny_Id :number; 
    Company_Name :string; 
    Contact_No :string; 
    No_of_Vacancy :number; 
    Salary :string;  
    Location :string; 
    Next_Followup_Date :Date; 
    Next_Followup_Date1 :Date; 
    Employee_Status_Id :number; 
    Employee_Status_Name :string;  
    To_Staff_Id :number; 
    To_Staff_Name :string;  
    Remark :string; 
    Contact_Person :string;  
    Email :string;  
    Address :string; 
    Website :string; 
    Gender_Id :number; 
    Gender_Name :string;  
    Job_Opening_Description :string; 

    Vacancy_Source_Id :number;
    Vacancy_Source_Name :string;

    By_User_Id : number;
    By_User_Name : string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

