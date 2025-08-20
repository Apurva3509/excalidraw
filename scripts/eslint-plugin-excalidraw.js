/**
 * @fileoverview Excalidraw custom ESLint plugin
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const noDirectBindingMutation = require("./eslint-rules/no-direct-binding-mutation");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

module.exports = {
  rules: {
    "no-direct-binding-mutation": noDirectBindingMutation,
  },
};
