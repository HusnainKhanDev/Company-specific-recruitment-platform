import cron from 'node-cron'
import ApplicationModel from '../Models/ApplicationModel.js'
import { PassDataToATS } from '../ATS_System/DataManagerATS.js'

cron.schedule('* 1 * * *' , async () => {   
    console.log("Ya chal raha ha")
    try{
        let result: DataType[] = await ApplicationModel.find({
            $and: [
                {atsFeedback:{$eq: "In Progress"}},
                {atsScore: {$eq: 0}}
            ]
        }).select("_id jobId resume skills")
        
        PassData(result)
    }
    catch(err){
        console.log(err)
    }
})

type DataType = {
    jobId: string,
    resume: string,
    skills: string[],
    _id: string
}

async function PassData(Data: DataType[]){
    for(let obj of Data){
        if(obj.jobId && obj.resume && obj.skills && obj._id){
            await PassDataToATS(obj.jobId, obj.resume, obj.skills, obj._id)
        }
    }
}