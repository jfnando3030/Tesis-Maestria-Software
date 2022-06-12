import{Request,Response} from 'express';
const{ClientBuilder}= require('@iota/client');
export async function saveTransaction(req:Request,res:Response){
try{
    const amount= req.body['amount'];
    const type=req.body['type'];
    const id=req.body['id'];
   const addressReceive=req.body['addressReceive'];
    const currency=req.body['currency'];
    const addressSend=req.body['addressSend'];
    const ip=req.body['ip'];
    const ubicacion=req.body['ubicacion'];
    const device=req.body['device'];
    const name_browser_or_device=req.body['name_browser_or_device'];
    const origin=req.body['origin'];
    const os_version=req.body['os_version'];
    const userIdSend=  req.body['userIdSend'];
    const idwalletSend = req.body['idwalletSend'];
    const idWalletReceive=req.body['idwalletReceive'];
    let concepto="Registro de transacción";
    let index=new TextEncoder().encode(id);
    let createdAt=new Date().toLocaleString("es-ES",{timeZone:"America/Guayaquil",
   year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'});
   let json=JSON.stringify({"ubicacion":ubicacion,"device":device,"name_browser_or_device":name_browser_or_device,
    "origin":origin,"os_version":os_version,"idwalletReceive":idWalletReceive,"idWalletSend":idwalletSend,"userIdSend":userIdSend,
    "amount":amount,"type":type,"id":id,"fecha":createdAt,"concepto":concepto,"addressReceive":addressReceive,"currency":currency,
    "addressSend":addressSend,"ip":ip});
    let data_encode=new TextEncoder().encode(json);
    let typeNetwork="mainnet";
    let url="https:// chrysalis-nodes.iota.org";
    const client=new ClientBuilder()
    .network(typeNetwork)
    .node(url)
    .build();
    const responseIota=await client.message()
    .index(index)
    .data(data_encode)
    .submit();
    let url_iota="https://explorer.iota.org/mainnet/message/"+responseIota["messageId"];
    res.status(200).send({code:200,url:url_iota})
}catch(error){
    res.status(200).send({code:400,message:'Ocurrio un error:${error}'})
}
}