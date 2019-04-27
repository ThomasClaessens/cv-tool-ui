/**
 * @flow
 */

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

function generateResumeSuccess(resumePdfURL: string, resumeDocXURL: string): Action {
  return {
    type: 'GENERATE_RESUME_SUCCESS',
    resumePdfURL,
    resumeDocXURL
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
    let jsonFiedResume = JSON.stringify(resumeData);

    const pdfRequest = {
      method: 'POST',
      headers: {
        Accept: 'application/pdf',
        'Content-Type': 'application/json'
      },
      body: jsonFiedResume
    }
    const docXRequest = {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Type': 'application/json'
      },
      body: jsonFiedResume
    }

    try {
      const pdfResponse = await fetch('/api/generate/resume', pdfRequest)
      const pdfBlob = await pdfResponse.blob()
      const pdfUrl = URL.createObjectURL(pdfBlob)
      const docXResponse = await fetch('/api/generate/resume?pdf=false', docXRequest)
      const docXBlob = await docXResponse.blob()
      const docXUrl = URL.createObjectURL(docXBlob)


      dispatch(saveResumeData(resumeData))
      dispatch(generateResumeSuccess(pdfUrl, docXUrl))
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
