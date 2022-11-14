import express from "express";
const router = express.Router();
import { ROLES_LIST } from "../../config/rolesList";
import {
  deleteUser,
  getAllUsers,
  getUser,
} from "../../controllers/usersController";
import { verifyRoles } from "../../middleware/verifyRoles";

router
  .route("/")
  .get(getAllUsers)
  //.get(verifyRoles(ROLES_LIST.Admin), getAllUsers)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

router.route("/:id").get(verifyRoles(ROLES_LIST.Admin), getUser);

module.exports = router;
