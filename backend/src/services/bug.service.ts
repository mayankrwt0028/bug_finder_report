import prisma from "../lib/prisma";
import { Priority, Severity, Reproducibility, BugStatus } from "@prisma/client";

export const CreateNewBug= async (data: {
  title: string;
  description: string;
  priority: Priority;
  severity: Severity;
  reproducibility: Reproducibility;
  projectId: string;
  assignedToId?: string;
  createdById: string;
}) =>{
  const{
    title,
    description,
    priority,
    severity,
    reproducibility,
    projectId,
    assignedToId,
    createdById

  } = data;
  if(!title||
    !description||
    !priority||
    !severity||
    !reproducibility||
    !projectId||
    !createdById){
      throw new Error("Please fill the all field")
    }

    const project = await prisma.project.findUnique({
      where: {
       id: projectId
      },
    })
    if(!project){
throw new Error("Project not found")

    }
   

  if (assignedToId) {
     const user = await prisma.user.findUnique({
    where: { id: assignedToId },
  });

  if (!user) {
    throw new Error("Assigned user not found");
  }
}

const bug = await prisma.bug.create({
  data: {
    title,
    description,
    priority,
    severity,
    reproducibility,
    projectId,
    createdById,
    assignedToId,
  },
});

  return bug;
}

export const assignBug = async(
  bugId: string,
  assignedToId:string
)=>{
  const bug = await prisma.bug.findUnique({
    where:{
      id:bugId
    }
  })
  if(!bug){
    throw new Error("bug not found")
  }

  const developer = await prisma.user.findUnique({
    where:{
      id:assignedToId
    },
  })
  if(!developer){
    throw new Error("Developer not found")
  }

  if(developer.role !== "DEVELOPER"){
    throw new Error("Bug can only assign to developer")
  }
const updateBug = await prisma.bug.update({
  where:{
    id: bugId
  },
  data:{
    assignedToId,
    status: "ASSIGNED"
  },
})
return updateBug;
}

export const getAllBugs = async ()=>{
  const bugs = await prisma.bug.findMany({
    include:{
      project:{
       select:{
        id:true,
        name:true
       },
      },
      createdBy:{
        select:{
          id:true,
          name:true,
          email:true,
        }
      },
      assignedTo:{
        select:{
          id:true,
          name:true,
          email:true,
        },
      },
    },
    orderBy:{
      createdAt:"desc"
    }
  })
  return bugs
}

export const getBugById = async (id: string) => {
  if (!id) {
    throw new Error("Bug id is required");
  }

  const bug = await prisma.bug.findUnique({
    where: { id },
    include: {
      project: {
        select: {
          id: true,
          name: true,
        },
      },
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      assignedTo: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      comments: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      attachments: true,
      activityLogs: true,
    },
  });

  if (!bug) {
    throw new Error("Bug not found");
  }

  return bug;
};


export const updateBug = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    priority?: Priority;
    severity?: Severity;
    reproducibility?: Reproducibility;
  }
) => {
  const {
    title,
    description,
    priority,
    severity,
    reproducibility,
  } = data;

  const existingBug = await prisma.bug.findUnique({
    where: { id },
  });

  if (!existingBug) {
    throw new Error("Bug not found");
  }

  const updatedBug = await prisma.bug.update({
    where: { id },
    data: {
      title,
      description,
      priority,
      severity,
      reproducibility,
    },
  });

  return updatedBug;
};

export const updateBugStatus = async(
  id:string,
  status:BugStatus
)=>{
  if(!id){
    throw new Error("Bug id id required")
  }

  const bug= await prisma.bug.findUnique({
    where:{
      id,
    }
  })
  if(!bug){
    throw new Error("bug not found")

  }

  const updateBug = await prisma.bug.update({
    where:{
      id,
    },data:{
      status,
    }
  })
return updateBug
}

export const deleteBug = async(
  id:string
)=>{
  if(!id){
    throw new Error("bug is required")
  }

  const bug = await prisma.bug.findUnique({
    where:{
      id
    }
  })
if(!bug){
  throw new Error("bug not found")
}

const deleteBug = await prisma.bug.delete({
  where:{
    id
  }
})
return deleteBug
}


