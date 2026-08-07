import api from '../api/axios'

export const getComment = (bugId: string)=>{
  return api.get(`/comment/bug/${bugId}`)
}

export const createComment =(
  bugId:string,
  message:string
)=>{
  return api.post(`/comment/${bugId}`),{
    message,
  }
}