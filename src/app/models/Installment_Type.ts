export class Installment_Type
{
Installment_Type_Id :number;
Installment_Type_Name :string;
No_Of_Installment :number;
Duration :number;
constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

