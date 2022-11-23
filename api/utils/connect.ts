import mongoose from "mongoose";
import config from "../config";
import logger from "../utils/logger";
import { isUsersEmptyModel } from "../models/user.model";

export const iue = new isUsersEmptyModel();

async function connect() {
  try {
    await mongoose.connect(config.dbUri);

    logger.info("DB connected");

    mongoose.connection.db
      .collection("users")
      .count(async function (err, count) {
        if (count == 0) {
          iue.value = true;

          await iue.save();
        }
      });
  } catch (error) {
    logger.error("Could not connect to db");

    process.exit(1);
  }
}

export default connect;
