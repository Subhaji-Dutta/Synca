import prisma from "../configs/prisma.js"

export const createProject=async(req,res)=>{
    try{
      const {userId}=req.auth() || {}
      const {workspaceId,description,name,status,start_date,end_date,team_members,team_lead,progress,priority}=req.body

      const workspace=await prisma.workspace.findUnique({
        where:{
          id:workspaceId
        },
        include:{members:{include:{user:true}}}
      })

      if(!workspace){
        return res.status(404).json({message:"Workspace not found"})
      }
      if(!workspace.members.some((member)=>member.userId===userId && member.role === "ADMIN")){
        return res.status(403).json({message:"You don't have permission to create projects in this workspace"})
      }

      const teamLead=await prisma.user.findUnique({
        where:{
           email:team_lead
        },
        select:{id:true}
      })

      const project=await prisma.project.create({
        data:{
          workspaceId,
          name,
          description,
          status,
          start_date: start_date? new Date(start_date) : null,
          end_date: end_date? new Date(end_date) : null,
          progress,
          priority,
          team_lead:teamLead?.id
        }
      })

      if(team_members?.length >0){
        const membersToAdd=[]
        workspace.members.forEach(member=>{
            if(team_members.includes(member.user.email)){
                membersToAdd.push(member.userId)
            }
        })
        await prisma.projectMember.createMany({
          data:membersToAdd.map(memberId=>({
            projectId:project.id,
            userId:memberId
          }))
        })
      }

      const projectWithMembers=await prisma.project.findUnique({
        where:{
          id:project.id
        },
        include:{ 
            members:{include:{user:true}},
            tasks:{include:{assignee:true, comments:{include:{user:true}}}},
            owner:true,
        }
      })
      res.json({project:projectWithMembers, message:"Project created successfully"})
      
    }catch(error){
        console.log(error)
        res.status(500).json({message:error.code || error.message })
    }
}

export const updateProject=async(req,res)=>{
    try{
     const {userId}=req.auth() || {}
     const {id,workspaceId,description,name,status,start_date,end_date,team_members,team_lead,progress,priority}=req.body

     const workspace =await prisma.workspace.findUnique({
        where:{
          id:workspaceId
        },
        include:{members:{include:{user:true}}}
      })

      if(!workspace){
        return res.status(404).json({message:"Workspace not found"})
      }
      if(!workspace.members.some((member)=>member.userId===userId && member.role === "ADMIN")){
        const project=await prisma.project.findUnique({
          where:{
            id
          }
        })
        if(!project){
          return res.status(404).json({message:"Project not found"})
        } else if(project.team_lead !== userId){
          return res.status(403).json({message:"You don't have permission to update this project"})
        }
      }

      const teamLead = team_lead ? await prisma.user.findUnique({
        where:{
           email:team_lead
        },
        select:{id:true}
      }) : null;

      const project=await prisma.project.update({
        where:{
          id
        },
        data:{
          name,
          description,
          status,
          start_date: start_date? new Date(start_date) : null,
          end_date: end_date? new Date(end_date) : null,
          progress,
          priority,
          team_lead:teamLead?.id
        }
      })
      res.json({project, message:"Project updated successfully"})
    }catch(error){
        console.log(error)
        res.status(500).json({message:error.code || error.message })
    }
}

export const addMember=async(req,res)=>{
    try{
        const {userId}=req.auth() || {}
        const {email}=req.body
        const {projectId}=req.params
        const project = await prisma.project.findUnique({
          where:{
            id:projectId
          },
          include:{members:{include:{user:true}}}
        })
        if(!project){
          return res.status(404).json({message:"Project not found"})
        } else if(project.team_lead !== userId){
          return res.status(403).json({message:"You don't have permission to add members to this project"})
        }
        const existingMember=project.members.some((member)=>member.user.email === email)
        if(existingMember){
          return res.status(400).json({message:"Member already added to this project"})
        }
        const user=await prisma.user.findUnique({
          where:{
            email
          }
        })
        if(!user){
          return res.status(404).json({message:"User not found"})
        }
        const member=await prisma.projectMember.create({
          data:{
            projectId,
            userId:user.id
          }
        })
        res.json({member, message:"Member added successfully"})
     
    }catch(error){
        console.log(error)
        res.status(500).json({message:error.code || error.message })
    }
}