/**
 * @flow
 */

import type { FormValues } from '../form/types'

type PreviewState = {
  data: {
    json?: FormValues,
    url?: string,
    pdfURL?: string
    docXURL?: string
  },
  resume: {
    pageCount: number,
    page: number,
    status?: 'pending' | 'success' | 'failure',
    url?: string
  },
  isDownloading: boolean
}

type PreviewAction =
  | { type: 'CLEAR_PREVIEW' }
  | { type: 'SAVE_RESUME_DATA', data: FormValues, url: string }
  | { type: 'DOWNLOAD_RESUME_DATA' }
  | { type: 'GENERATE_RESUME_REQUEST' }
  | { type: 'GENERATE_RESUME_SUCCESS', resumePdfURL: string, resumeDocXURL: string }
  | { type: 'GENERATE_RESUME_FAILURE' }
  | { type: 'SET_PAGE_COUNT', pageCount: number }
  | { type: 'PREV_PAGE' }
  | { type: 'NEXT_PAGE' }

export type { PreviewState, PreviewAction }
