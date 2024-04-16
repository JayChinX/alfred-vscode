import alfred, { OutputItem } from "./alfred/index.js";

import { getRecentProjects } from "./read/read.js";

const items: OutputItem[] = [{ arg: "", title: "", subtitle: "" }];

try {
  const projects = await getRecentProjects();

  items.push(
    ...projects.map((i) => ({
      arg: i.path,
      title: `${i.name}${i.isFile ? "(File)" : ""}`,
      subtitle: i.path,
    }))
  );
} catch (e) {}

alfred.output({ items }, ["title"]);

// const searchStrategies = {
//   matchFromStart(value, input) {
//     function format(v) {
//       return v.toLowerCase().replace(/[^a-z0-9]/g, "");
//     }
//     return format(value).startsWith(format(input));
//   },
//   matchIncludes(value, input) {
//     function format(v) {
//       return v.toLowerCase().replace(/[^a-z0-9]/g, "");
//     }
//     return format(value).includes(format(input));
//   },
//   keywordIncludes(value, input) {
//     const keywords = input
//       .replace(/[^a-z0-9]/g, " ")
//       .split(" ")
//       .filter(function (v) {
//         return !!v;
//       });
//     return keywords.every((keyword) => {
//       return searchStrategies.matchIncludes(value, keyword);
//     });
//   },
// };

// // updateProjectsCache();
// const projects = getProjects();
// const searchResultsByStrategy = [];
// const searchStrategyNames = [
//   "matchFromStart",
//   "matchIncludes",
//   "keywordIncludes",
// ];

// projects.forEach(function (project) {
//   for (let i = 0; i < searchStrategyNames.length; i++) {
//     const searchStrategy = searchStrategies[searchStrategyNames[i]];
//     if (searchStrategy(project.name, alfy.input)) {
//       searchResultsByStrategy[i] = searchResultsByStrategy[i] || [];
//       searchResultsByStrategy[i].push(project);
//       return;
//     }
//   }
// });

// const items = searchResultsByStrategy.reduce(function (all, searchResults) {
//   return [...all, ...searchResults];
// }, []);

// const output = items.map(function (project) {
//   const absolutePath = path.join(project.wd, project.name);
//   return {
//     title: project.name,
//     uid: absolutePath,
//     subtitle: absolutePath,
//     arg: absolutePath,
//     autocomplete: project.name,
//     type: "file",
//   };
// });

// alfy.output(output);
