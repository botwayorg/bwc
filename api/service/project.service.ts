import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import ProjectModel, { ProjectDocument } from "../models/project.model";

export async function createProject(
  input: DocumentDefinition<Omit<ProjectDocument, "createdAt" | "updatedAt">>
) {
  return ProjectModel.create(input);
}

export async function findProject(
  query: FilterQuery<ProjectDocument>,
  options: QueryOptions = { lean: true }
) {
  return ProjectModel.findOne(query, {}, options);
}

export async function findAndUpdateProject(
  query: FilterQuery<ProjectDocument>,
  update: UpdateQuery<ProjectDocument>,
  options: QueryOptions
) {
  return ProjectModel.findOneAndUpdate(query, update, options);
}

export async function deleteProject(query: FilterQuery<ProjectDocument>) {
  return ProjectModel.deleteOne(query);
}
