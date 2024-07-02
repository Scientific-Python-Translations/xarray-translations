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
  ],
  format: "po",
};
