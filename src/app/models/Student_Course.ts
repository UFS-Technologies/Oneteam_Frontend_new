import { Student_Course_Subject } from './Student_Course_Subject'
import { Student_Fees_Installment_Details } from './Student_Fees_Installment_Details'
export class Student_Course
{
Student_Course_Id:number;
Student_Id:number;
Entry_Date:Date;
Course_Name_Details:string;
Course_Id:number;
Course_Name:string;
Start_Date:Date;
End_Date:Date;
Join_Date:Date;
By_User_Id:number;
Status:number;
Course_Type_Name:string;
Agent_Amount:number
Course_Type_Id:number;
Total_Fees:number;
Batch_Id:number;
Batch_Name:string;
Faculty_Id:number;
Faculty_Name:string;
Installment_Type_Id :number;
Installment_Type_Name :string;

Fees_Type_Id :number;
Fees_Type_Name :string;
Laptop_details_Id:number;
Laptop_details_Name:string;

trainer:string;
Fee_Paid:number;


Start_Time :string; 
End_Time :string;

No_Of_Installment :number;
Duration :number;
Old_Course_Id:number;
Student_Course_Subject:Student_Course_Subject[];
Student_Fees_Installment_Details:Student_Fees_Installment_Details[];

Student_Course_Subject_Value : number;


constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

