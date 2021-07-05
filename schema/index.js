"use strict";

exports.userSchema = {
  type: "object",
  properties: {
    userName: {
      type: "string",
    },
    dateOfBirth: {
      type: "string",
      format: "", //should be date
    },
  },
  required: ["userName", "dateOfBirth"],
  additionalProperties: false,
};
