import express from "express";
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("layout", {
    message: JSON.stringify(
      { status: 200, message: "ok 👍" },
      null,
      " "
    ).toString(),
  });
});

module.exports = router;
