import { Express, Request, Response } from "express";
import {
  createProjectHandler,
  getProjectHandler,
  updateProjectHandler,
} from "./controllers/project.controller";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
  deleteSessionHandler,
} from "./controllers/session.controller";
import {
  createUserHandler,
  getCurrentUser,
} from "./controllers/user.controller";
import requireUser from "./middleware/requireUser";
import validateResource from "./middleware/validateResource";
import {
  createProjectSchema,
  deleteProjectSchema,
  getProjectSchema,
  updateProjectSchema,
} from "./schema/project.schema";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSchema } from "./schema/user.schema";
import { iue } from "./utils/connect";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  app.get("/api/me", requireUser, getCurrentUser);

  app.get("/api/get-users", (req, res) => {
    let status: number, message;

    try {
      if (iue.value) {
        status = 402;
        message = "users collection are empty 🙃";
      } else {
        status = 200;
        message = "users collection aren't empty 👍";
      }

      res.status(status).render("layout", {
        message: JSON.stringify(
          { status: status, message: message },
          null,
          " "
        ).toString(),
      });
    } catch (e) {}
  });

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionsHandler);

  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.post(
    "/api/projects",
    [requireUser, validateResource(createProjectSchema)],
    createProjectHandler
  );

  app.put(
    "/api/projects/:projectId",
    [requireUser, validateResource(updateProjectSchema)],
    updateProjectHandler
  );

  app.get(
    "/api/projects/:projectId",
    validateResource(getProjectSchema),
    getProjectHandler
  );

  app.delete(
    "/api/projects/:projectId",
    [requireUser, validateResource(deleteProjectSchema)],
    getProjectHandler
  );
}

export default routes;
