import { object, number, string, TypeOf } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    description: string({
      required_error: "Description is required",
    }).min(120, "Description should be at least 120 characters long"),
    lang: number({
      required_error: "Language is required",
    }),
    botType: string({
      required_error: "Bot Type is required",
    }),
  }),
};

const params = {
  params: object({
    projectId: string({
      required_error: "projectId is required",
    }),
  }),
};

export const createProjectSchema = object({
  ...payload,
});

export const updateProjectSchema = object({
  ...payload,
  ...params,
});

export const deleteProjectSchema = object({
  ...params,
});

export const getProjectSchema = object({
  ...params,
});

export type CreateProjectInput = TypeOf<typeof createProjectSchema>;
export type UpdateProjectInput = TypeOf<typeof updateProjectSchema>;
export type ReadProjectInput = TypeOf<typeof getProjectSchema>;
export type DeleteProjectInput = TypeOf<typeof deleteProjectSchema>;
