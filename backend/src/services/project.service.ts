
import prisma from "../lib/prisma";

export const createProject = async(data: {
  name: string,
  description?: string,
  createdById:string
}) =>{
  const {name, description, createdById} = data

  if(!name || !createdById){
    throw new Error("All field are required")
  }
const existingProject = await prisma.project.findUnique({
  where: {
    name,
  },
});

if (existingProject) {
  throw new Error("Project already exists");
}
const user = await prisma.user.findUnique({
    where: {
      id: createdById,
    },
  });

  if (!user) {
    throw new Error("User not found.");
  }
  const project = await prisma.project.create({
    data: {
      name,
      description,
      createdById,
    },
  });

  return project;
  
}

export const getAllProjects = async()=>{
  const projects = await prisma.project.findMany({
    orderBy:{
      createdAt: "desc"
    }
  })
  return projects
}

export const getProjectById = async (id:string)=>{
  if(!id){
    throw new Error("Project id is required")
  }
  const project = await prisma.project.findUnique({
    where:{
      id,
    },
  })
  if(!project){
    throw new Error("project not found")
  }
  return project
}

export const updateProject = async (
  id: string,
  data: {
    name?: string;
    description?: string;
  }
) => {
  const { name, description } = data;

  const existingProject = await prisma.project.findUnique({
    where: { id },
  });

  if (!existingProject) {
    throw new Error("Project not found");
  }

  if (name && name !== existingProject.name) {
    const duplicateProject = await prisma.project.findUnique({
      where: { name },
    });

    if (duplicateProject) {
      throw new Error("Project name already exists");
    }
  }

  const updatedProject = await prisma.project.update({
    where: { id },
    data: {
      name,
      description,
    },
  });

  return updatedProject;
};

export const deleteProject = async (id: string) => {
  const existingProject = await prisma.project.findUnique({
    where: { id },
  });

  if (!existingProject) {
    throw new Error("Project not found");
  }

  await prisma.project.delete({
    where: { id },
  });

  return {
    message: "Project deleted successfully",
  };
};