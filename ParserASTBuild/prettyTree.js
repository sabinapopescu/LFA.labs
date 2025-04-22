export function drawASTTree(node, indent = "", isLeft = true) {
    if (!node) return "";
  
    let output = "";
  
    const nodeLabel = getNodeLabel(node);
  
    output += indent;
    output += isLeft ? "├── " : "└── ";
    output += nodeLabel + "\n";
  
    if (node.type === "BinaryOperator") {
      // Right child first (so tree renders with left side on the left visually)
      output += drawASTTree(node.right, indent + (isLeft ? "│   " : "    "), true);
      output += drawASTTree(node.left, indent + (isLeft ? "│   " : "    "), false);
    }
  
    return output;
  }
  
  function getNodeLabel(node) {
    switch (node.type) {
      case "BinaryOperator":
        return node.operator;
      case "Number":
        return node.value.toString();
      case "Variable":
        return node.identifier;
      default:
        return "?";
    }
  }
  