export class Student_Fees_Installment_Details
{
Student_Fees_Installment_Details_Id :number;
Student_Fees_Installment_Master_Id :number; 
Instalment_Date :Date; 
Fees_Amount :number;
Tax_Percentage:number
Balance_Amount:number;
Status :number;
Instalment_Period:number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

