import { getAllPages } from "./src/cms/loader";
import { buildNavTree } from "./src/cms/tree";
getAllPages().then(pages => {
  const tree = buildNavTree(pages);
  const clientsFolder = tree.find(node => node.label === "clients");
  console.log("CLIENTS TREE NODE:", JSON.stringify(clientsFolder, null, 2));
});
