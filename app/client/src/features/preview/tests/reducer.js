/**
 * @flow
 */

import reducer from '../reducer'
import {
  clearPreview,
  generateResumeRequest,
  generateResumeSuccess,
  generateResumeFailure
} from '../actions'
import type { PreviewState as State } from '../types'

describe('preview reducer', () => {
  it('should handle clearPreview', () => {
    const state: State = {
      isDownloading: false,
      data: {
        json: {
          selectedTemplate: 1,
          headings: {
            work: '',
            education: '',
            skills: '',
            projects: '',
            awards: ''
          },
          basics: {
            name: '',
            email: '',
            phone: '',
            website: '',
            location: {
              address: ''
            }
          },
          education: [
            {
              institution: '',
              location: '',
              area: '',
              studyType: '',
              startDate: '',
              endDate: '',
              gpa: ''
            }
          ],
          work: [
            {
              company: '',
              location: '',
              position: '',
              website: '',
              startDate: '',
              endDate: '',
              highlights: ['']
            }
          ],
          skills: [
            {
              name: '',
              keywords: [{
                name: '',
                level: 3
              }]
            }
          ],
          projects: [
            {
              name: '',
              description: '',
              url: '',
              keywords: ['']
            }
          ],
          awards: [
            {
              title: '',
              date: '',
              awarder: '',
              summary: ''
            }
          ]
        }
      },
      resume: {
        pageCount: 1,
        page: 1
      }
    }

    const action = clearPreview()

    const expected: State = {
      isDownloading: false,
      data: {},
      resume: {
        pageCount: 1,
        page: 1
      }
    }

    const actual: State = reducer(state, action)

    expect(actual).toEqual(expected)
  })

  it('should handle GENERATE_RESUME_REQUEST', () => {
    const state: State = {
      isDownloading: false,
      data: {},
      resume: {
        pageCount: 1,
        page: 1
      }
    }

    const action = generateResumeRequest()

    const expected: State = {
      ...state,
      resume: {
        ...state.resume,
        status: 'pending'
      }
    }

    const actual: State = reducer(state, action)

    expect(actual).toEqual(expected)
  })

  it('should handle GENERATE_RESUME_SUCCESS', () => {
    const state: State = {
      isDownloading: false,
      data: {},
      resume: {
        pageCount: 1,
        page: 1
      }
    }

    const action = generateResumeSuccess('/fake/resume.pdf', '/fake/resume.docx')

    const expected: State = {
      ...state,
      data: {
        docXURL: '/fake/resume.docx',
        status: 'success',
        url: '/fake/resume.pdf'
      },
      resume: {
        ...state.resume,
        status: 'success',
        url: '/fake/resume.pdf'
      }
    }

    const actual: State = reducer(state, action)

    expect(actual).toEqual(expected)
  })

  it('should handle GENERATE_RESUME_FAILURE', () => {
    const state: State = {
      isDownloading: false,
      data: {},
      resume: {
        pageCount: 1,
        page: 1
      }
    }

    const action = generateResumeFailure()

    const expected: State = {
      ...state,
      resume: {
        ...state.resume,
        status: 'failure'
      }
    }

    const actual: State = reducer(state, action)

    expect(actual).toEqual(expected)
  })
})
