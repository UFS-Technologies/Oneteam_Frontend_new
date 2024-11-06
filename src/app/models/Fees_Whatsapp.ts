export class Fees_Whatsapp
{
    // Mode_Id:number;
    // Mode_Name:string;


     whatsAppBusinessId:string;
    phoneNumberId:string;
    from:string;
    to:string;
    type:string;
    templateName:string;
    templateId:string;
    language:string;
    header:[];
    body:any;
    button:string;
    student:string;
    tostaff:string;
    trainer_name:string;
    next_payment_date:Date;
    payment_amount:string;
    pending_amount:string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

