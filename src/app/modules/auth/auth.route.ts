import { Router } from "express";
import { AuthController } from "./auth.controller";
const router = Router();

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.post("/logout", AuthController.logoutUser);
router.post('/refresh-token', AuthController.refreshToken);

export const AuthRoutes = router;
