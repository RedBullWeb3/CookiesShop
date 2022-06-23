const express = require("express");
const { getAddonsFromReq } = require("../utils/get-addons-from-req");
const { COOKIE_ADDONS, COOKIE_BASES } = require("../data/cookies-data");
const { showErrorPage } = require("../utils/show-error-page");

const configuratorRouter = express.Router();

configuratorRouter
  .get("/select-base/:baseName", (req, res) => {
    const { baseName } = req.params;

    if (!COOKIE_BASES[baseName]) {
      return showErrorPage(res, `There is no such base as ${baseName}`);
    }

    res.cookie("cookieBase", baseName).render("configurator/base-selected", {
      baseName,
    });
  })
  .get("/add-addon/:addonName", (req, res) => {
    const { addonName } = req.params;

    if (!COOKIE_ADDONS[addonName]) {
      return showErrorPage(res, `There is no such addon as ${addonName}`);
    }

    const addons = getAddonsFromReq(req);
    if (addons.includes(addonName)) {
      return showErrorPage(
        res,
        `${addonName} is already on your cookie, you cannot add it twice.`
      );
    }
    addons.push(addonName);

    res
      .cookie("cookieAddons", JSON.stringify(addons))
      .render("configurator/added", {
        addonName,
      });
  })
  .get("/delete-addon/:addonName", (req, res) => {
    const { addonName } = req.params;

    const oldAddons = getAddonsFromReq(req);
    if (!oldAddons.includes(addonName)) {
      return showErrorPage(
        res,
        `Cannot delete something that isn't already added to the cookie. ${addonName} not found on cookie.`
      );
    }
    const addons = oldAddons.filter((addon) => addon !== addonName);

    res
      .cookie("cookieAddons", JSON.stringify(addons))
      .render("configurator/deleted", {
        addonName,
      });
  });

module.exports = {
  configuratorRouter,
};
