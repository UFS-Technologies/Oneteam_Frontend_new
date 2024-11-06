import { MarkStatus } from "./MarkStatus";
export class Level_Score_Details
{
Level_Score_Details_Id :number;  
Level_Score_Master_Id :number; 
Check_Box :boolean; 
Student_Course_Id :number; 
Student_Id :number; 
User_Id :number; 
Entry_Level :number; 
Personality_and_Professionalism_Entrylevel :number; 
Mid_Level :number; 
Personality_and_Professionalism_Midlevel :number; 
Exit_Level :number; 
Personality_and_Professionalism_Exitlevel :number; 
Project_Score :number; 
Project_Url :string; 
// Entry_Level_Add_UserId :number; 
// Mid_Level_Add_UserId :number; 
// Exit_Level_Add_UserId :number; 
// Project_Add_UserId :number; 
Entry_Level_Status :number; 
Mid_Level_Status :number; 
Exit_Level_Status :number; 
Project_Status :number; 
TotalMark :number; 
Markstatus_Id :number; 
Markstatus_Name :string; 
MarkStatus_Type_:MarkStatus;
    

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

