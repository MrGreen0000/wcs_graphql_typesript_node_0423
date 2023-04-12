import { Router } from "express";
import WildersController from "../controller/WildersController";

const wildersRouter = Router();

const wildersControllers = new WildersController();

wildersRouter.get("/api/wilders", wildersControllers.read);
wildersRouter.get("/api/wilders/:id", wildersControllers.readOne);
wildersRouter.post("/api/wilders", wildersControllers.create);
wildersRouter.put("/api/wilders/:id", wildersControllers.update);
wildersRouter.delete("/api/wilders/:id", wildersControllers.delete);

wildersRouter.post(
  "/api/wilders/:wilderId/skills/:skillId",
  wildersControllers.addSkillToWilder
);

export default wildersRouter;
