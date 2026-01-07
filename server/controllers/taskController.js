import { inngest } from "../inngest/index.js"
import prisma from "../configs/prisma.js"

export const createTask=async(req,res)=>{
    try{
        const {userId}=req.auth() || {}
        const {projectId,title,description,type,status,priority,assigneeId,due_date}=req.body
        const origin=res.get('origin')

        const project=await prisma.project.findUnique({
          where:{
            id:projectId
          },
          include:{members:{include:{user:true}}}
        })
        if(!project){
          return res.status(404).json({message:"Project not found"})
        }else if(project.team_lead !== userId){
          return res.status(403).json({message:"You don't have permission to create tasks in this project"})
        }else if(assigneeId && !project.members.find((member)=>member.user.id===assigneeId)){
          return res.status(404).json({message:"Assignee is not a part of this project"})
        }
        const task=await prisma.task.create({
          data:{
            projectId,
            title,
            description,
            type,
            status,
            priority,
            assigneeId,
            due_date: due_date ? new Date(due_date) : null
          }
        })

        const taskWithAssignee=await prisma.task.findUnique({
          where:{
            id:task.id
          },
          include:{assignee:true}
        })
        await inngest.send({
          name:"app/task.assigned",
          data:{
            taskId:task.id, origin
          }
        })
        res.status(201).json({message:"Task created successfully",task:taskWithAssignee})
    }catch(error){
        console.log(error)
        res.status(500).json({message:error.code || error.message })
    }
}

export const updateTask=async(req,res)=>{
    try{
      const task=await prisma.task.findUnique({
        where:{
          id:req.params.id
        }
      })
      if(!task){
        return res.status(404).json({message:"Task not found"})
      }
        const {userId}=req.auth() || {}

        const project=await prisma.project.findUnique({
          where:{id:task.projectId},
          include:{members:{include:{user:true}}}
        })
        if(!project){
          return res.status(404).json({message:"Project not found"})
        }else if(project.team_lead !== userId){
          return res.status(403).json({message:"You don't have permission to update tasks in this project"})
        }

        const updateTask=await prisma.task.update({
          where:{
            id:req.params.id
          },
          data:req.body
        })
        res.status(201).json({message:"Task updated successfully",task:updateTask})
    }catch(error){
        console.log(error)
        res.status(500).json({message:error.code || error.message })
    }
}

export const deleteTask=async(req,res)=>{
    try{
        const {userId}=req.auth() || {}
        const {tasksIds}=req.body
        const tasks=await prisma.task.findMany({
          where:{
            id:{
              in:tasksIds
            }
          }
        })

        if(tasks.length===0){
          return res.status(404).json({message:"Tasks not found"})
        }

        const project=await prisma.project.findUnique({
          where:{id:tasks[0].projectId},
          include:{members:{include:{user:true}}}
        })
        if(!project){
          return res.status(404).json({message:"Project not found"})
        }else if(project.team_lead !== userId){
          return res.status(403).json({message:"You don't have permission to update tasks in this project"})
        }

        await prisma.task.deleteMany({
          where:{
            id:{
              in:tasksIds
            }
          }
        })
        res.status(201).json({message:"Tasks deleted successfully"})
    }catch(error){
        console.log(error)
        res.status(500).json({message:error.code || error.message })
    }
}

