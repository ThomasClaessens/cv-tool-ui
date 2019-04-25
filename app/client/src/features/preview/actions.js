/**
 * @flow
 */

import FileSaver from 'file-saver'
import { isEqual } from 'lodash'
import type { PreviewAction as Action } from './types'
import type { FormValuesWithSectionOrder } from '../form/types'
import type { AsyncAction } from '../../app/types'

function clearPreview(): Action {
  return {
    type: 'CLEAR_PREVIEW'
  }
}

function saveResumeData(data: FormValuesWithSectionOrder): Action {
  const { Blob, URL } = window
  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  return {
    type: 'SAVE_RESUME_DATA',
    data,
    url
  }
}

function generateResumeRequest(): Action {
  return {
    type: 'GENERATE_RESUME_REQUEST'
  }
}

function generateResumeSuccess(resumeURL: string): Action {
  return {
    type: 'GENERATE_RESUME_SUCCESS',
    resumeURL
  }
}

function generateResumeFailure(): Action {
  return {
    type: 'GENERATE_RESUME_FAILURE'
  }
}

function generateResume(resumeData: FormValuesWithSectionOrder): AsyncAction {
  return async (dispatch, getState) => {
    const { resume, data } = getState().preview
    if (resume.status === 'pending' || isEqual(data.json, resumeData)) {
      return
    }

    dispatch(generateResumeRequest())

    const { fetch, URL } = window
    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/pdf',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resumeData)
    }

    try {
      const response = await fetch('/api/generate/resume', request)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)

      dispatch(saveResumeData(resumeData))
      dispatch(generateResumeSuccess(url))
    } catch (err) {
      dispatch(generateResumeFailure())
    }
  }
}

export {
  clearPreview,
  generateResume,
  generateResumeRequest,
  generateResumeSuccess,
  generateResumeFailure
}
