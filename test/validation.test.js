import { expect } from 'chai'
import { validateType } from '../index'
import {
  good,
  missingTitle,
  missingCompleted,
  titleTooShort,
  titleTooShortWithTrailingSpaces,
  titleIsNumber,
  titleIsObject,
  completedIsString
} from './fixture'

export const todoType = {
  name: 'todoType',
  fields: [
    {
      name: 'title',
      dataTypes: ['number', 'string'],
      minLength: 3,
      required: true
    },
    {
      name: 'completed',
      dataTypes: ['boolean'],
      required: false
    }
  ]
}

describe('valdation test', function() {
  it('good', function() {
    const ret = validateType(good, todoType)
    expect(ret.errorCount).to.equal(0)
  })
  it('missingTitle', function() {
    const ret = validateType(missingTitle, todoType)
    expect(ret.errorCount).to.equal(1)
    expect(ret.errors[0].title).to.equal(
      'Required field "title" was not found.'
    )
  })
  it('missingCompleted', function() {
    const ret = validateType(missingCompleted, todoType)
    expect(ret.errorCount).to.equal(0)
  })
  it('missingCompleted', function() {
    // completed is not required
    const ret = validateType(missingCompleted, todoType)
    expect(ret.errorCount).to.equal(0)
  })
  it('titleTooShort', function() {
    const ret = validateType(titleTooShort, todoType)
    expect(ret.errorCount).to.equal(1)
    expect(ret.errors[0].title).to.equal('must have a length >= 3')
  })
  it('missingCompleted', function() {
    const ret = validateType(titleTooShortWithTrailingSpaces, todoType)
    expect(ret.errorCount).to.equal(1)
    expect(ret.errors[0].title).to.equal('must have a length >= 3')
    
  })
  it.only('missingCompleted', function() {
    const ret = validateType(titleIsNumber, todoType)
    console.log('ret', ret)
    // expect(ret.errorCount).to.equal(1)
    // expect(ret.errors[0].title).to.equal('must have a length >= 3')
  })
  

})