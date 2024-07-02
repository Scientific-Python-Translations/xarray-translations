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

  // Function to wrap string literals in the `t` macro using template literals
  const wrapStringLiteral = (node) => j.taggedTemplateExpression(
    j.identifier('t'),
    j.templateLiteral([j.templateElement({ raw: node.value, cooked: node.value }, true)], [])
  );

  // Find all string literals and wrap them with `t`
  root.find(j.Literal)
    .filter(path => {
      // Skip URLs and import paths
      const parent = path.parentPath;
      return (
        typeof path.node.value === 'string' &&
        !parent.node.source &&  // Skip import paths
        !/https?:\/\//.test(path.node.value) // Skip URLs
      );
    })
    .replaceWith(path => wrapStringLiteral(path.node));

  return root.toSource();
};
