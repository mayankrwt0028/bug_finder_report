import { Request , Response } from "express";
import { registerService } from "../services/auth.service";
import { error } from "node:console";
import { loginService } from "../services/auth.service";


//creating new user
export const register = async(req: Request,res: Response)=>{

try {
  const result = await registerService(req.body)

  return res.status(201).json(result)

} catch (error) {
  console.error(error);

  return res.status(500).json({
    success: false,
    message: error instanceof Error ? error.message : "Internal Server Error",
  });
}
}

//Login user

export const login = async(req: Request, res: Response) =>{
  try{
const result = await loginService(req.body)
return res.status(200).json(result);

  }catch(error){
console.log(error)
return res.status(400).json({
  success : false,
  message : error instanceof Error ? error.message : "Login Failed"
})
  }
}


// export const updateProject = async (
//   id: string,
//   data: {
//     name?: string;
//     description?: string;
//   }
// ) => {
//   const { name, description } = data;

//   // Check if project exists
//   const existingProject = await prisma.project.findUnique({
//     where: { id },
//   });

//   if (!existingProject) {
//     throw new Error("Project not found");
//   }

//   // If name is changing, check for duplicates
//   if (name && name !== existingProject.name) {
//     const duplicateProject = await prisma.project.findUnique({
//       where: { name },
//     });

//     if (duplicateProject) {
//       throw new Error("Project name already exists");
//     }
//   }

//   const updatedProject = await prisma.project.update({
//     where: { id },
//     data: {
//       name,
//       description,
//     },
//   });

//   return updatedProject;
// };