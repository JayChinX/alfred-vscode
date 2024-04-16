import fs from "fs";
import os from "os";

// const wds = process.env.wds.split(",");

export async function getRecentProjects() {
  const preferencesBasePath = `${os.homedir()}/Library/Application Support/Code/`;
  const appDir = "User";

  if (!appDir) {
    throw new Error("Not Found Application");
  }
  const recentPreferencesFile = `${preferencesBasePath}${appDir}/globalStorage/storage.json`;
  const recentPreferences = fs.readFileSync(recentPreferencesFile, {
    encoding: "utf8",
  });
  const recentPreferencesObj = JSON.parse(recentPreferences);
  return recentPreferencesObj.lastKnownMenubarData.menus.File.items
    .find((e) => e.id === "submenuitem.MenubarRecentMenu")
    .submenu.items.filter(
      (e) =>
        e.id === "openRecentFolder" ||
        e.id === "openRecentWorkspace" ||
        e.id === "openRecentFile"
    )
    .map((e) => {
      const label = e.label;
      const title = label ? label.substring(label.lastIndexOf("/") + 1) : "";

      const uriPath = e.uri.path;
      const path = `${uriPath}`.replace("$USER_HOME$", os.homedir());
      return {
        name: title ? title : path.substring(path.lastIndexOf("/") + 1),
        path: path,
        isFile: e.id === "openRecentFile",
      };
    });
}
