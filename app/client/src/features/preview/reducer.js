/**
 * @flow
 */

import type { PreviewState as State } from './types'
import type { Action } from '../../app/types'

const initialState = {
  isDownloading: false,
  data: {},
  resume: {
    pageCount: 1,
    page: 1
  }
}

function preview(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'CLEAR_PREVIEW':
      return initialState

    case 'SAVE_RESUME_DATA':
      return {
        ...state,
        data: {
          ...state.data,
          json: action.data,
          url: action.url
        },
        resume: {
          ...state.resume
        }
      }

    case 'GENERATE_RESUME_REQUEST':
      return {
        ...state,
        resume: {
          ...state.resume,
          status: 'pending'
        }
      }

    case 'GENERATE_RESUME_SUCCESS':
      return {
        ...state,
        resume: {
          ...state.resume,
          status: 'success',
          url: action.resumePdfURL
        },
        data: {
          ...state.data,
          status: 'success',
          url: action.resumePdfURL,
          docXURL: action.resumeDocXURL
        }
      }

    case 'GENERATE_RESUME_FAILURE':
      return {
        ...state,
        resume: {
          ...state.resume,
          status: 'failure'
        }
      }

    case 'SET_PAGE_COUNT':
      return {
        ...state,
        resume: {
          ...state.resume,
          pageCount: action.pageCount
        }
      }

    case 'PREV_PAGE':
      return {
        ...state,
        resume: {
          ...state.resume,
          page: Math.max(state.resume.page - 1, 1)
        }
      }

    case 'NEXT_PAGE':
      return {
        ...state,
        resume: {
          ...state.resume,
          page: Math.min(state.resume.page + 1, state.resume.pageCount)
        }
      }

    default:
      return state
  }
}

export default preview
