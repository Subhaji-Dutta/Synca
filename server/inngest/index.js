import { Inngest } from "inngest";
import prisma from "../configs/prisma.js";
import sendEmail from "../configs/nodemailer.js";

export const inngest = new Inngest({ id: "synca", name: "Synca" });

const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { data } = event
    try {
      await prisma.user.create({
        data: {
          id: data.id,
          email: data?.email_addresses[0]?.email_address,
          name: data?.first_name + " " + data?.last_name,
          image: data?.image_url,
        },
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
);

const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { data } = event;
    try {
      await prisma.user.delete({
        where: {
          id: data.id,
        },
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
);

const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { data } = event;
    try {
      await prisma.user.update({
        where: {
          id: data.id,
        },
        data: {
          email: data?.email_addresses[0]?.email_address,
          name: data?.first_name + " " + data?.last_name,
          image: data?.image_url,
        },
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
);

const syncWorkspaceCreation = inngest.createFunction(
  { id: "sync-workspace-from-clerk" },
  { event: "clerk/organization.created" },
  async ({ event }) => {
    const { data } = event;
    try {
      await prisma.workspace.create({
        data: {
          id: data.id,
          name: data.name,
          slug: data.slug,
          ownerId: data.created_by,
          image_url: data.image_url,
        },
      });

      await prisma.workspaceMember.create({
        data: {
          userId: data.created_by,
          workspaceId: data.id,
          role: "ADMIN",
        },
      });
    } catch (error) {
      console.error('Error creating workspace:', error);
      throw error;
    }
  }
);

const syncWorkspaceUpdation = inngest.createFunction(
  { id: "update-workspace-from-clerk" },
  { event: "clerk/organization.updated" },
  async ({ event }) => {
    const { data } = event;
    try {
      await prisma.workspace.update({
        where: {
          id: data.id,
        },
        data: {
          name: data.name,
          slug: data.slug,
          image_url: data.image_url,
        },
      });
    } catch (error) {
      console.error('Error updating workspace:', error);
      throw error;
    }
  }
);

const syncWorkspaceDeletion = inngest.createFunction(
  { id: "delete-workspace-from-clerk" },
  { event: "clerk/organization.deleted" },
  async ({ event }) => {
    const { data } = event;
    try {
      await prisma.workspace.delete({
        where: {
          id: data.id,
        },
      });
    } catch (error) {
      console.error('Error deleting workspace:', error);
      throw error;
    }
  }
);

const syncWorkspaceMemberCreation = inngest.createFunction(
  { id: "sync-workspace-member-from-clerk" },
  { event: "clerk/organizationInvitation.accepted" },
  async ({ event }) => {
    const { data } = event;
    try {
      await prisma.workspaceMember.create({
        data: {
          userId: data.user_id,
          workspaceId: data.organization_id,
          role: String(data.role_name).toUpperCase(),
        },
      });
    } catch (error) {
      console.error('Error creating workspace member:', error);
      throw error;
    }
  }
);

const sendTaskAssignmentEmail=inngest.createFunction(
  {id:"send-task-assignment-email"},
  {event:"app/task.assigned"},
  async({event,step})=>{
    const {taskId,origin}=event.data

    const task=await prisma.task.findUnique({
      where:{id:taskId},
      include:{assignee:true,project:true}
    })
    await sendEmail({
      to:task.assignee.email,
      subject:`New Task Assigned: ${task.project.name}`,
      body:`<div style="max-width:600px;">
            <h2>Hi ${task.assignee.name}, 👋🏻.</h2>

            <p style="font-size:16px;">You have been assigned to the task: </p>
            <p style="font-size:16px; font-weight:bold; color: #007bff; margin:8px 0;">${task.title}</p>
            <div style="border:1px solid #ddd; padding:12px 16px; border-radius:6px; margin-bottom:30px;">
            <p style="margin:6px 0;"><b>Project:</b> ${task.project.name}</p>
            <p style="margin:6px 0;"><b>Description:</b> ${task.description}</p>
            <p style="margin:6px 0;"><b>Due Date:</b> ${new Date(task.due_date).toLocaleDateString()}</p>
            </div>
            <a href="${origin}" style="display:inline-block;font-size:16px; padding:12px 24px; background-color: #007bff; color:#fff; text-decoration:none; border-radius:6px; font-weight:600;">View Task</a>
            <p style="margin-top:20px; font-size:14px; color:#6c757d;">If you have any questions or need further assistance, please don't hesitate to reach out to us.</p>
            <p style="margin-top:20px; font-size:14px; color:#6c757d;">Be sure to complete and review the task before the due date.</p>
            <p style="margin-top:20px; font-size:14px; color:#6c757d;">Best regards,</p>
            <p style="font-size:16px; margin-top:20px;">Synca</p>
            </div>`
    })

    if(new Date(task.due_date).toLocaleDateString()!== new Date().toDateString()){
      await step.sleepUntil("wait-for-the-due-date", new Date(task.due_date))

      await step.run("check-if-task-is-completed",async()=>{
        const task=await prisma.task.findUnique({
          where:{id:taskId},
          include:{assignee:true,project:true}
        })

        if(!task){
          return;
        }

        if(task.status!=="DONE"){
          await step.run("send-task-reminder-mail",async()=>{
            await sendEmail({
              to:task.assignee.email,
              subject:`Reminder for ${task.project.name}`,
              body:`<div style="max-width:600px;">
                    <h2>Hi ${task.assignee.name}, 👋🏻.</h2>
        
                    <p style="font-size:16px;">You have a task due in ${task.project.name}:</p>
                    <p style="font-size:16px; font-weight:bold; color: #007bff; margin:8px 0;">${task.title}</p>
                    
                    <div style="border:1px solid #ddd; padding:12px 16px; border-radius:6px; margin-bottom:30px;">
                    <p style="margin:6px 0;"><b>Description:</b> ${task.description}</p>
                    <p style="margin:6px 0;"><b>Due Date:</b> ${new Date(task.due_date).toLocaleDateString()}</p>
                    </div>
                    
                    <a href="${origin}" style="display:inline-block;font-size:16px; padding:12px 24px; background-color: #007bff; color:#fff; text-decoration:none; border-radius:6px; font-weight:600;">View Task</a>

                    <p style="margin-top:20px; font-size:14px; color:#6c757d;">Please complete the task before the due date.</p>

                    <p style="margin-top:20px; font-size:14px; color:#6c757d;">If you have any questions or need further assistance, please don't hesitate to reach out to us.</p>

                    <p style="margin-top:20px; font-size:14px; color:#6c757d;">Best regards,</p>
                    <p style="font-size:16px; margin-top:20px;">Synca</p>
            </div>`
          })
        })
      }
    })
  }

  if(task.status==="DONE"){
    await sendEmail({
      to:task.assignee.email,
      subject:`Task Completed: ${task.project.name}`,
      body:`<div style="max-width:600px;">
            <h2>Hi ${task.assignee.name}, 👋🏻.</h2>
            
            <p style="font-size:16px;">You have completed the task: ${task.title}</p>

            <p style="margin-top:20px; font-size:14px; color:#6c757d;">If you have any questions or need further assistance, please don't hesitate to reach out to us.</p>
            
            <p style="margin-top:20px; font-size:14px; color:#6c757d;">Best regards,</p>
            <p style="font-size:16px; margin-top:20px;">Synca</p>`
    })
  }
}
)

export const functions = [
  syncUserCreation,
  syncUserDeletion,
  syncUserUpdation,
  syncWorkspaceCreation,
  syncWorkspaceUpdation,
  syncWorkspaceDeletion,
  syncWorkspaceMemberCreation,
  sendTaskAssignmentEmail,
]
