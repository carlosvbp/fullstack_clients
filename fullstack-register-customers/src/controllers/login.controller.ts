import { Request, Response } from "express";
import { LoginService } from "../services/login.service";

export class LoginController {
    constructor(private loginService: LoginService) { }
    async login(req: Request, res: Response) {
        const token = await this.loginService.createToken(req.body)
        return res.status(200).json(token)
    }
}
