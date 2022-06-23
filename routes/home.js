const express = require("express");
const { COOKIE_BASES, COOKIE_ADDONS } = require("../data/cookies-data");
const { handlebarsHelper } = require("../utils/handlebars-helper");
const { getAddonsFromReq } = require("../utils/get-addons-from-req");

const homeRouter = express.Router();

homeRouter.get("/", (req, res) => {
  const { cookieBase } = req.cookies;

  const addons = getAddonsFromReq(req);

  const sum =
    (cookieBase
      ? handlebarsHelper.findPrice(Object.entries(COOKIE_BASES), cookieBase)
      : 0) +
    addons.reduce(
      (prev, curr) =>
        prev + handlebarsHelper.findPrice(Object.entries(COOKIE_ADDONS), curr),
      0
    );

  res.render("home/index", {
    cookie: {
      base: cookieBase,
      addons,
    },
    bases: Object.entries(COOKIE_BASES),
    addons: Object.entries(COOKIE_ADDONS),
    sum,
  });
});

module.exports = {
  homeRouter,
};
