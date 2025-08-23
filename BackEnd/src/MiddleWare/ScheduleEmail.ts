import cron from 'node-cron'
import ApplicationModel from '../Models/ApplicationModel.js'
import { SendMailToCandidate } from './SendMail.js';

cron.schedule('* 1 * * *' , async () => {   
    console.log("Ya chal raha haaa")
    try{
        let result: DataType[] = await ApplicationModel.find({
            status: 'Pending'
        })
            .select("email jobId candidateId") // keep IDs so populate can use them
            .populate([
                { path: "candidateId", select: "fullname" },
                { path: "jobId", select: "title" }
            ]);

        if(result.length > 0 ){
            // console.log(result)
            PassData(result)
        }
    }   
    catch(err){
        console.log(err)
    }
})

type DataType = {
    email: string
}

async function PassData(Data: any){
    for(let item of Data){
        if(item){
            console.log(item.email, item?.jobId.title, item.candidateId.fullname)
            await SendMailToCandidate(item.email,  item.candidateId.fullname, item?.jobId.title)
        }
    }
}