
export class Batch
{
Batch_Id:number;
Batch_Name:string;
User_Id:number;
Start_Date:Date;
End_Date:Date;
BatchFollowUp:boolean;
Course_Id :number; 
Course_Name :string; 
Trainer_Id :number; 
Trainer_Name :string; 
Branch_Id :number; 
Branch_Name :string;
Batch_Start_Time :string ;
Batch_End_Time :string;
Batch_Complete_Status:number;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

