export function buildFileTree(files) {
  const root = [];
  const map = new Map();

  // Create a sorted list of paths
  const paths = Object.keys(files).sort((a, b) => a.localeCompare(b));

  for (const path of paths) {
    const parts = path.split('/').filter(p => p);
    let currentLevel = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const currentPath = parts.slice(0, i + 1).join('/');
      
      let node = map.get(currentPath);

      if (!node) {
        const isFolder = i < parts.length - 1 || path.endsWith('/');
        node = {
          name: part,
          path: currentPath,
          type: isFolder ? 'folder' : 'file',
          children: isFolder ? [] : undefined,
        };
        map.set(currentPath, node);
        currentLevel.push(node);
      }
      
      if (node.type === 'folder') {
        currentLevel = node.children;
      }
    }
  }

  // Sort nodes at each level: folders first, then files, alphabetically
  const sortNodes = (nodes) => {
    nodes.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      }
      return a.type === 'folder' ? -1 : 1;
    });
    nodes.forEach(node => {
      if (node.type === 'folder' && node.children) {
        sortNodes(node.children);
      }
    });
  };
  
  sortNodes(root);
  return root;
}
