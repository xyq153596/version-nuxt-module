const fse = require("fs-extra");
const path = require("path");

async function asyncModule() {
  const { BUILD_ENV, IS_BUILD_DEV } = this.options.env;
  if (IS_BUILD_DEV) {
    this.nuxt.hook("generate:done", async nuxt => {
      const nextVersion = nuxt.options.project.version.nextDev;
      const pkgPath = path.join(nuxt.options.rootDir, "package.json");
      const pkg = await fse.readJson(pkgPath);
      pkg.project.version[BUILD_ENV] = nextVersion;
      await fse.outputFile(pkgPath, JSON.stringify(pkg, null, "\t"));
    });
  }
}

module.exports = asyncModule;
module.exports.meta = require("./package.json");
