export class Application_Settings
{
    Application_Settings_Id :number
    Users_Id :number 
    Users_Name :string 

    Complaint_Users_Id :number 
    Complaint_Users_Name :string 
    
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

