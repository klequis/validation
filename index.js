import { isEmpty, isNil } from 'ramda'
import { hasProp } from 'lib'
import validator from 'validator'
import { yellow, blue } from 'logger'

/**
 * Returns true if the value is [], '', null, {}, or undefined
 *
 * @param {any} value
 * @returns {boolean}
 */

const isEmptyOrNil = value => isEmpty(value) || isNil(value) ? true : false

const createReturnObj = (errors) => ({ errorCount: errors.length, errors: errors })




export const validateType = (obj, objType) => {
  // yellow('objType', objType)
  yellow('obj', obj)
  yellow('typeof obj.title', typeof obj.title)
  let errors = []
  objType.fields.forEach(f => {
    const fieldName = f.name
    // blue('fieldName', fieldName)
    const dataTypes = f.dataTypes
    // blue('dataTypes', dataTypes)
    const minLength = f.minLength || null
    // blue('minLength', minLength)
    const fieldValue = typeof obj[fieldName] === 'string' ? obj[fieldName].trim() : obj[fieldName]
    // blue('fieldValue', fieldValue)


    const required = f.required || false
    // blue('required', required)
    // Does it have the field and is it required?
    if (required && !hasProp(fieldName, obj)) {
      errors.push({
        [fieldName]: `Required field "${fieldName}" was not found.`
      })
      return createReturnObj(errors)
    }
    // Does it have a value?
    if (required && isEmptyOrNil(fieldValue)) {
      errors.push({
        [fieldName]: `Required field "${fieldName}" has empty value.`
      })
      return createReturnObj(errors)
    }

    // Is the data type correct?
    if (!typeof fieldVale in dataTypes) {
      errors.push({
        [fieldName]: `Incorrect data type. Should be one of ${dataTypes.toString()}`
      })
    }
    yellow('isLength', validator.isLength(fieldValue, { min: 3 }))
    // For strings, is it the correct length




// Here are my thoughts
- if it isn't a string make it one
- if it is boolean don't check the length (boolean cannot have length)













    if (typeof fieldValue !== 'string' && minLength > 0) {
      
      if (fieldValue.length < minLength) {
        errors.push({
          [fieldName]: `must have a length >= ${minLength}`
        })
      }
    }

  })
  const ret = createReturnObj(errors)
  // yellow('errors', ret)
  return ret
}

