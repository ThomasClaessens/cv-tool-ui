/**
 * @flow
 */

import Router from 'koa-router'
import formidable from 'koa2-formidable'
import { generateDocument, generateSourceCode } from '../generator'
import { sanitizer, jsonResume } from '../middleware'

const router = new Router({ prefix: '/api' })

/**
 * Router middleware
 */

router.use('/generate', sanitizer()) // Remove falsy values and empty objects/arrays from request body
router.use('/upload', formidable(), jsonResume()) // Parse multipart/form-data

/**
 * Generate PDF from form data
 */

router.post('/generate/resume', async ({ request, response }) => {
  response.body = generateDocument((request.body: any))
  response.type = 'application/pdf'
})

/**
 * Generate DOCX from form data
 */

router.post('/generate/resume?pdf=false', async ({ request, response }) => {
  response.body = generateDocument((request.body: any))
  response.type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
})

/**
 * Generate TeX source from form data
 */

router.post('/generate/source', async ({ request, response }) => {
  response.body = generateSourceCode((request.body: any))
  response.type = 'application/zip'
})

/**
 * Handle JSON upload from input file
 */

router.post('/upload', async ({ request, response }) => {
  response.body = (request.jsonResume: any)
  response.type = 'application/json'
})

export default router
