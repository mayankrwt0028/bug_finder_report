import {Router} from "express"
import {register, login} from "../controllers/auth.controller"

const router = Router()
router.get("/test", (req,res)=>{
  res.json({
    message: "working"
  })
})
router.post("/register", register)
router.post("/login",login)


export default router