import { Router } from "express";
import SkillController from "../controller/SkillsController";

const skillsRouter = Router();

const skillsController = new SkillController();

skillsRouter.get("/api/skills", skillsController.read);
skillsRouter.get("/api/skills/:id", skillsController.readOne);
skillsRouter.post("/api/skills", skillsController.create);
skillsRouter.put("/api/skills/:id", skillsController.update);
skillsRouter.delete("/api/skills/:id", skillsController.delete);

export default skillsRouter;
