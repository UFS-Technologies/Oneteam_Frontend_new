export class Save_Whatsapp
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
    header:string;
    body:any;
    button:string;
    student:string;
    tostaff:string;

constructor(values: Object = {})  
{
Object.assign(this, values) 
}
}

