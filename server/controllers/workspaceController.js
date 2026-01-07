import prisma from "../configs/prisma.js";

export const getUserWorkspaces = async (req, res) => {
  try {
    const { userId } = req.auth();
    const workspaces = await prisma.workspace.findMany({
      where: {
        members: { some: { userId: userId } },
      },
      include: {
        members: { include: { user: true } },
        projects: {
          include: {
            tasks: {
              include: {
                assignee: true,
                comments: { include: { user: true } },
              },
            },
            members: { include: { user: true } },
          },
        },
        owner: true,
      },
    });
    res.json({ workspaces });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.code || error.message });
  }
};


export const createWorkspace = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { name, organizationId } = req.body;

    if (!name || !organizationId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if workspace already exists for this organization
    const existingWorkspace = await prisma.workspace.findUnique({
      where: { organizationId }
    });

    if (existingWorkspace) {
      return res.status(200).json({ workspace: existingWorkspace, message: "Workspace already exists" });
    }

    // Create the workspace
    const workspace = await prisma.workspace.create({
      data: {
        name,
        organizationId,
        ownerId: userId,
        members: {
          create: {
            userId,
            role: "ADMIN"
          }
        }
      },
      include: {
        members: { include: { user: true } },
        owner: true,
        projects: true
      }
    });

    res.status(201).json({ workspace, message: "Workspace created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.code || error.message });
  }
};

export const addMember=async(req,res)=>{
    try{
       const {userId}=req.auth();
       const {email,role,workspaceId,message}=req.body;

       const user=await prisma.user.findUnique({
        where:{
            email
        }
       })
       if(!user){
        return res.status(404).json({message:"User not found"})
       }
       if(!workspaceId || !role){
        return res.status(400).json({message:"Missing required fields"})
       }

       if(!["ADMIN","MEMBER"].includes(role)){
        return res.status(400).json({message:"Invalid role"})
       }

       const workspace=await prisma.workspace.findUnique({
        where:{
            id:workspaceId
        }, include:{
            members:true
          }})
       if(!workspace.members.find((member)=>member.userId===userId && member.role === "ADMIN")){
        return res.status(401).json({message:"Only admins can add members"})
       }

       const existingMember=workspace.members.find((member)=>member.userId===user.id)
       if(existingMember){
        return res.status(400).json({message:"User is already a member of the workspace"})
       }

       const member=await prisma.workspaceMember.create({
        data:{
            userId:user.id,
            workspaceId,
            role,
            message
        }
       })
       res.status(201).json({member,message:"Member added successfully"})

    }catch(error){
        console.log(error);
    res.status(500).json({ message: error.code || error.message });
    }
}