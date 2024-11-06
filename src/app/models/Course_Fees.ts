export class Course_Fees
{
Course_Fees_Id:number;
Course_Id:number;
Fees_Type_Id:number;
Amount:number;
Tax:number;
    Fees_Type_Name:string;
No_Of_Instalment:string;
Instalment_Period:string;

Period_Id:number;
Period_Name:string;
Period_From:Date;
Period_To:Date;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

