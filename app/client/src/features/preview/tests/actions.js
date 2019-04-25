/**
 * @flow
 */

import {
  clearPreview,
  generateResumeRequest,
  generateResumeSuccess,
  generateResumeFailure,
} from '../actions'
import type { PreviewAction as Action } from '../types'

describe('actions', () => {
  it('can clear the preview state', () => {
    const expected: Action = { type: 'CLEAR_PREVIEW' }
    const actual: Action = clearPreview()
    expect(actual).toEqual(expected)
  })

  it('can request resume generation', () => {
    const expected: Action = { type: 'GENERATE_RESUME_REQUEST' }
    const actual: Action = generateResumeRequest()
    expect(actual).toEqual(expected)
  })

  it('can succeed at resume generation', () => {
    const expected: Action = {
      type: 'GENERATE_RESUME_SUCCESS',
      resumeURL: '/fake/path.pdf'
    }
    const actual: Action = generateResumeSuccess('/fake/path.pdf')
    expect(actual).toEqual(expected)
  })

  it('can fail at resume generation', () => {
    const expected: Action = { type: 'GENERATE_RESUME_FAILURE' }
    const actual: Action = generateResumeFailure()
    expect(actual).toEqual(expected)
  })
})
