import { DocumentDefinition, FilterQuery } from "mongoose";
import { omit } from "lodash";
import UserModel, {
  isUsersEmptyDocument,
  isUsersEmptyModel,
  UserDocument,
} from "../models/user.model";
import { iue } from "../utils/connect";

export async function createUser(
  input: DocumentDefinition<
    Omit<
      UserDocument,
      "createdAt" | "updatedAt" | "isAdmin" | "comparePassword"
    >
  >
) {
  try {
    const user = await UserModel.create(input);

    try {
      if (iue.value) {
        user.isAdmin = true;

        await user.save();

        iue.value = false;

        await iue.save();
      }
    } catch (e) {
      console.log(e);
    }

    return omit(user.toJSON(), "password");
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}

export async function createIUE(
  input: DocumentDefinition<isUsersEmptyDocument>
) {
  return isUsersEmptyModel.create(input);
}
