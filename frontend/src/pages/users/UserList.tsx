import { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
} from "@mui/material";

import toast from "react-hot-toast";

import {
  getUsers,
  updateUserRole,
  deleteUser,
} from "../../services/user.service";


interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}


const UserList = () => {

  const [users, setUsers] = useState<User[]>([]);


  const fetchUsers = async () => {
    try {

      const res = await getUsers();

      setUsers(res.data.user);

    } catch(error){

      toast.error("Failed to fetch users");

    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);



  const handleRoleChange = async(
    id:string,
    role:string
  ) => {

    try {

      await updateUserRole(id, role);

      toast.success("Role updated");

      fetchUsers();

    } catch(error){

      toast.error("Role update failed");

    }

  };



  const handleDelete = async(id:string)=>{

    try {

      await deleteUser(id);

      toast.success("User deleted");

      fetchUsers();

    } catch(error){

      toast.error("Delete failed");

    }

  };



  return (

    <Paper sx={{p:3}}>

      <Typography
        variant="h5"
        sx={{mb:3}}
      >
        Users Management
      </Typography>


      <TableContainer>

        <Table>

          <TableHead>

            <TableRow>

              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Action</TableCell>

            </TableRow>

          </TableHead>



          <TableBody>

            {
              users.map((user)=>(

                <TableRow key={user.id}>

                  <TableCell>
                    {user.name}
                  </TableCell>


                  <TableCell>
                    {user.email}
                  </TableCell>


                  <TableCell>

                    <Select
                      value={user.role}
                      size="small"
                      onChange={(e)=>
                        handleRoleChange(
                          user.id,
                          e.target.value
                        )
                      }
                    >

                      <MenuItem value="ADMIN">
                        ADMIN
                      </MenuItem>

                      <MenuItem value="MANAGER">
                        MANAGER
                      </MenuItem>

                      <MenuItem value="QA">
                        QA
                      </MenuItem>

                      <MenuItem value="DEVELOPER">
                        DEVELOPER
                      </MenuItem>


                    </Select>

                  </TableCell>



                  <TableCell>

                    <Button
                      color="error"
                      variant="contained"
                      size="small"
                      onClick={()=>
                        handleDelete(user.id)
                      }
                    >
                      Delete
                    </Button>

                  </TableCell>


                </TableRow>

              ))
            }


          </TableBody>


        </Table>

      </TableContainer>


    </Paper>

  );
};


export default UserList;