const solve = (rules) => {

  let bagColorAmount = 0;
  const getChildrenObjects = (children) => {
    const childrenObjects = [];
    const bagIndexes = [];
    children.forEach((child, index) => {
      if (child.includes('bag')) {
        bagIndexes.push(index);
      }
    });
    bagIndexes.forEach(bagIndex => {
      let childObject = {
        color: children.slice(bagIndex - 2, bagIndex).join(' '),
        bagAmount: children[bagIndex - 3]
      };
      childrenObjects.push(childObject);
    });
    return childrenObjects;
  };

  const search = (tree, target) => {
    const shinyGoldKey = 'shiny gold';
    if (!tree[target]) return;

    const colors = tree[target];
    const shinyGoldBags = colors.filter(colorObj => colorObj.color === shinyGoldKey);
    bagColorAmount += shinyGoldBags.length;
  }

  const growTree = (splittedRules) => {
    const bagTree = {};
    splittedRules.forEach(rule => {
      let divider = rule.indexOf('contain');
      let parentSection = rule.slice(0, divider);
      let childrenSection = rule.slice(divider + 1);
      const parentBagIndex = parentSection.indexOf('bag');
      const parentColor = parentSection.slice(parentBagIndex - 2, parentBagIndex).join(' ');
      const childrenObjects =  getChildrenObjects(childrenSection);
      bagTree[parentColor] = childrenObjects;
    });
    return bagTree;
  };

  const splittedRules = rules.map(rule => [...rule.split(' ')]);
  const bagTree = growTree(splittedRules);

  // Find amount of bag colors that can contain one shiny gold
  const shinyGoldKey = 'shiny gold';
  for (const key in bagTree) {
    if (key !== shinyGoldKey) {
      const colors = bagTree[key];
      const shinyGoldBags = colors.filter(colorObj => colorObj.color === shinyGoldKey);
      bagColorAmount += shinyGoldBags.length;

      for (const child of colors) {
        search(bagTree, child.color);
      }
    }
  }
  return 'Amount of bag colors that contain one shiny gold bag: ' + bagColorAmount;
}
// First layer: 3 - dark cyan, dull coral, clear gold
// Second layer: dark cyan = 8, dull coral = 2, clear gold = 1
// Total: 3 + 8 + 2 + 1 = 14
module.exports = { solve }