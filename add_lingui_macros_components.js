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
    console.log('Added import for @lingui/macro');
  }

  // Function to wrap text nodes in the `t` macro using template literals
  const wrapTextNode = (node) => j.taggedTemplateExpression(
    j.identifier('t'),
    j.templateLiteral([j.templateElement({ raw: node.value, cooked: node.value }, true)], [])
  );

  // Process <Text> and <Heading> nodes
  root.find(j.JSXElement)
    .filter(path => {
      const tagName = path.node.openingElement.name.name;
      return tagName === 'Text' || tagName === 'Heading';
    })
    .forEach(path => {
      let modified = false;
      path.node.children = path.node.children.map(child => {
        if (child.type === 'JSXText') {
          const trimmedValue = child.value.trim();
          if (trimmedValue) {
            modified = true;
            return j.jsxExpressionContainer(wrapTextNode(j.stringLiteral(trimmedValue)));
          }
        } else if (child.type === 'JSXExpressionContainer') {
          const expression = child.expression;
          if (expression.type === 'Literal' && typeof expression.value === 'string') {
            const trimmedValue = expression.value.trim();
            if (trimmedValue) {
              modified = true;
              return j.jsxExpressionContainer(wrapTextNode(j.stringLiteral(trimmedValue)));
            }
          } else if (expression.type === 'CallExpression' && expression.arguments.length > 0) {
            expression.arguments = expression.arguments.map(arg => {
              if (arg.type === 'Literal' && typeof arg.value === 'string') {
                const trimmedValue = arg.value.trim();
                if (trimmedValue) {
                  modified = true;
                  return wrapTextNode(j.stringLiteral(trimmedValue));
                }
              }
              return arg;
            });
          }
        }
        return child;
      });
      if (modified) {
        console.log(`Modified tag: ${path.node.openingElement.name.name}`);
      }
    });

  return root.toSource();
};
