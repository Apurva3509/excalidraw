/**
 * @fileoverview Rule to prevent direct mutation of startBinding or endBinding via mutateElement
 * @author mtolmacs
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "disallow direct mutation of startBinding or endBinding via mutateElement",
      category: "Best Practices",
      recommended: false,
    },
    fixable: null,
    schema: [],
    messages: {
      noDirectBindingMutation:
        "Direct mutation of {{ property }} via mutateElement() is not allowed. Use proper binding update functions instead.",
    },
  },

  create(context) {
    return {
      CallExpression(node) {
        // Check if this is a call to mutateElement
        if (
          node.callee.type === "Identifier" &&
          node.callee.name === "mutateElement"
        ) {
          // mutateElement should have at least 3 arguments: element, elementsMap, updates
          if (node.arguments.length >= 3) {
            const updatesArg = node.arguments[2];

            // Check if the third argument is an object literal
            if (updatesArg.type === "ObjectExpression") {
              // Look for startBinding or endBinding properties
              for (const property of updatesArg.properties) {
                if (
                  property.type === "Property" &&
                  property.key.type === "Identifier" &&
                  (property.key.name === "startBinding" ||
                    property.key.name === "endBinding")
                ) {
                  context.report({
                    node: property,
                    messageId: "noDirectBindingMutation",
                    data: {
                      property: property.key.name,
                    },
                  });
                }
              }
            }
          }
        }
      },
    };
  },
};
