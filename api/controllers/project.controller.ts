import { Request, Response } from "express";
import {
  CreateProjectInput,
  UpdateProjectInput,
} from "../schema/project.schema";
import {
  createProject,
  deleteProject,
  findAndUpdateProject,
  findProject,
} from "../service/project.service";

export async function createProjectHandler(
  req: Request<{}, {}, CreateProjectInput["body"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const body = req.body;

  const project = await createProject({ ...body, user: userId });

  return res.send(project);
}

export async function updateProjectHandler(
  req: Request<UpdateProjectInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;

  const projectId = req.params.projectId;
  const update = req.body;

  const project = await findProject({ projectId });

  if (!project) {
    return res.sendStatus(404);
  }

  if (String(project.user) !== userId) {
    return res.sendStatus(403);
  }

  const updatedProject = await findAndUpdateProject({ projectId }, update, {
    new: true,
  });

  return res.send(updatedProject);
}

export async function getProjectHandler(
  req: Request<UpdateProjectInput["params"]>,
  res: Response
) {
  const projectId = req.params.projectId;
  const project = await findProject({ projectId });

  if (!project) {
    return res.sendStatus(404);
  }

  return res.send(project);
}

export async function deleteProjectHandler(
  req: Request<UpdateProjectInput["params"]>,
  res: Response
) {
  const userId = res.locals.user._id;
  const projectId = req.params.projectId;

  const project = await findProject({ projectId });

  if (!project) {
    return res.sendStatus(404);
  }

  if (String(project.user) !== userId) {
    return res.sendStatus(403);
  }

  await deleteProject({ projectId });

  return res.sendStatus(200);
}
