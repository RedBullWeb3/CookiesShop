function showErrorPage(res, description) {
  return res.render("error", {
    description,
  });
}

module.exports = {
  showErrorPage,
};
