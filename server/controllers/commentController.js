import prisma from "../configs/prisma.js"

export const addComment=async(req,res)=>{
    try{
        const {userId}=req.auth() || {}
        const {projectId,taskId,content}=req.body
        const task=await prisma.task.findUnique({
          where:{id:taskId},
        })

        const project=await prisma.project.findUnique({
          where:{id:task.projectId},
          include:{members:{include:{user:true}}}
        })
        if(!project){
          return res.status(404).json({message:"Project not found"})
        }
        const member=project.members.find((member)=>member.user.id===userId)
        if(!member){
          return res.status(403).json({message:"You don't have permission to add comments in this project"})
        }
        const comment=await prisma.comment.create({
          data:{
            taskId,
            content,
            userId
          },
          include:{user:true}
        })
        res.json({message:"Comment added successfully",comment})
    }catch(error){
        console.log(error)
        res.status(500).json({message:error.code || error.message })
    }
}

export const getTaskComments=async(req,res)=>{
    try{    
        const {taskId}=req.params
        const comments=await prisma.comment.findMany({
            where:{taskId}, include:{user:true}
        })
        res.json({comments})
    }catch(error){
        console.log(error)
        res.status(500).json({message:error.code || error.message})
    }
}
