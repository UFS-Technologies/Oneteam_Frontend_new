

export class Vacancy_Source
{
    Vacancy_Source_Id :number;
    Vacancy_Source_Name :string;
    Order_By :number;
    User_Id:number;
FollowUp:boolean;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

