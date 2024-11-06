

export class Employer_Status
{
    Employer_Status_Id :number;
    Employer_Status_Name :string;
    Order_By :number;
    User_Id:number;
FollowUp:boolean;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

