

import { isEmpty, isNil } from "ramda";
import { hasProp } from "lib";
import { yellow, blue } from "logger";
import chalk from 'chalk'

// null or undefined, empty



const validateType = (obj, objType) => {
  yellow("objType", objType);
  let errors = [];
  const result = objType.fields.map(f => {
    // blue('name', f.name)
    // blue('dataTypes', f.dataTypes)
    // blue('minLength', typeof f.minLength)
    const required = f.required === undefined ? false : f.required;
    blue("required", required);
    // console.log(chalk.bgBlue('required'), required)
    // const fieldName = f.name
    // yellow('fieldName', fieldName)

    // is the field required
    // const required = f.required || false
    // yellow('required', required)
    // does obj have the field
    // const hasField = hasProp(fieldName, obj)
    // yellow('hasField', hasField)

    // is it the right type

    // [optional] is it the right length

    // const fieldValue = obj[fieldName]
  });
  return { errorCount: errors.length, errors: errors };
}

const obj = { title: 'hi', complete: false }

const todoType = {
  name: "todoType",
  fields: [
    {
      name: "title",
      dataTypes: ["number", "string"],
      minLength: 3,
      required: true
    },
    {
      name: "completed",
      dataTypes: ["boolean"],
      required: false
    }
  ]
}

validateType(obj, todoType)

export default validateType;