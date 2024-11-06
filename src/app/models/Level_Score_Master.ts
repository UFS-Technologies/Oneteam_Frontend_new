import { Level_Score_Details } from "./Level_Score_Details";

export class Level_Score_Master
{
    Level_Score_Master_Id :number;
    User_Id :number; 
    Course_Id :number; 
    Batch_Id :number; 
    Batch_Name:string;
    Course_Name:string;
    Level_Score_Details:Level_Score_Details[];
    Level_Score_Details_Value:number;
    Check_Box:boolean;
    

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

