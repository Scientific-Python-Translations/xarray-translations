/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ["pt", "ja"],
  sourceLocale: "en",
  catalogs: [
    {
      path: "<rootDir>/src/{locale}/components",
      include: ["src/en/components"],
    },
    {
      path: "<rootDir>/src/{locale}/data",
	include: ["src/en/data"],
    },
    {
      path: "<rootDir>/src/{locale}/pages",
      include: ["src/en/pages/team.js", "src/en/pages/index.js"],
    },
  ],
  format: "po",
};
