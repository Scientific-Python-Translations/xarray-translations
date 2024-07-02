module.exports = function(fileInfo, { jscodeshift: j }) {
  const root = j(fileInfo.source);

  // Ensure `@lingui/macro` is imported
  const hasImport = root.find(j.ImportDeclaration)
    .filter(path => path.node.source.value === '@lingui/macro')
    .size() > 0;

  if (!hasImport) {
    root.find(j.Program).get('body', 0).insertBefore(
      j.importDeclaration(
        [j.importSpecifier(j.identifier('t'))],
        j.literal('@lingui/macro')
      )
    );
  }

  // Function to wrap text nodes in the `t` macro
  const wrapTextNode = (node) => j.taggedTemplateExpression(
    j.identifier('t'),
    j.templateLiteral(
      [j.templateElement({ raw: node.value, cooked: node.value })],
      []
    )
  );

  // Function to process text within <Text> and <Heading> tags
  const processTextNode = (children) => {
    return children.map(child => {
      if (child.type === 'JSXText') {
        const trimmedValue = child.value.trim();
        if (trimmedValue) {
          return j.jsxExpressionContainer(wrapTextNode(j.stringLiteral(trimmedValue)));
        }
      } else if (child.type === 'JSXExpressionContainer' && child.expression.type === 'Literal') {
        const trimmedValue = child.expression.value.trim();
        if (trimmedValue) {
          return j.jsxExpressionContainer(wrapTextNode(j.stringLiteral(trimmedValue)));
        }
      } else if (child.type === 'JSXElement') {
        child.children = processTextNode(child.children);
        return child;
      }
      return child;
    });
  };

  // Process <Text> and <Heading> nodes
  root.find(j.JSXElement)
    .filter(path => {
      const tagName = path.node.openingElement.name.name;
      return tagName === 'Text' || tagName === 'Heading';
    })
    .forEach(path => {
      path.node.children = processTextNode(path.node.children);
    });

  return root.toSource();
};
