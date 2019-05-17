/**
 * @flow
 */

import { reducer } from 'redux-form'
import type { FormState } from './types'
import type { Action } from '../../app/types'

const initialState = {
    jsonUpload: {},
    values: {
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
            jobTitle: '',
            dateOfBirth: '',
            gender: '',
            citizenship: '',
            location: {
                address: ''
            },
            email: '',
            phone: '',
            website: ''
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
                startDate: '',
                endDate: '',
                jobTitle: '',
                sector: '',
                responsibilities: [''],
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
}

function form(state: FormState = initialState, action: Action): FormState {
    switch (action.type) {
        case 'UPLOAD_JSON_REQUEST': {
            return {
                ...state,
                jsonUpload: {
                    status: 'pending'
                }
            }
        }

        case 'UPLOAD_JSON_SUCCESS': {
            return {
                ...state,
                jsonUpload: {
                    status: 'success'
                },
                values: {
                    ...state.values,
                    ...action.json
                }
            }
        }

        case 'UPLOAD_JSON_FAILURE': {
            return {
                ...state,
                jsonUpload: {
                    status: 'failure',
                    errMessage: action.errMessage
                }
            }
        }

        case 'SELECT_TEMPLATE': {
            return {
                ...state,
                values: {
                    ...state.values,
                    selectedTemplate: action.templateId
                }
            }
        }

        case 'ADD_SCHOOL': {
            return {
                ...state,
                values: {
                    ...state.values,
                    education: [...state.values.education, {}]
                }
            }
        }

        case 'REMOVE_SCHOOL': {
            if (state.values.education.length <= 1) {
                return state
            }

            return {
                ...state,
                values: {
                    ...state.values,
                    education: state.values.education.slice(0, -1)
                }
            }
        }

        case 'ADD_JOB': {
            return {
                ...state,
                values: {
                    ...state.values,
                    work: [...state.values.work, {highlights: ['']}]
                }
            }
        }

        case 'REMOVE_JOB': {
            if (state.values.work.length <= 1) {
                return state
            }

            return {
                ...state,
                values: {
                    ...state.values,
                    work: state.values.work.slice(0, -1)
                }
            }
        }

        case 'ADD_JOB_HIGHLIGHT': {
            return {
                ...state,
                values: {
                    ...state.values,
                    work: [
                        ...state.values.work.slice(0, action.index),
                        {
                            ...state.values.work[action.index],
                            highlights: [...state.values.work[action.index].highlights, '']
                        },
                        ...state.values.work.slice(action.index + 1)
                    ]
                }
            }
        }

        case 'REMOVE_JOB_HIGHLIGHT': {
            if (
                    !state.values.work[action.index] ||
                    !state.values.work[action.index].highlights ||
                    state.values.work[action.index].highlights.length <= 1
            ) {
                return state
            }

            return {
                ...state,
                values: {
                    ...state.values,
                    work: [
                        ...state.values.work.slice(0, action.index),
                        {
                            ...state.values.work[action.index],
                            highlights: state.values.work[action.index].highlights.slice(
                                    0,
                                    -1
                            )
                        },
                        ...state.values.work.slice(action.index + 1)
                    ]
                }
            }
        }

        case 'ADD_SKILL': {
            return {
                ...state,
                values: {
                    ...state.values,
                    skills: [
                        ...state.values.skills,
                        {
                            keywords: [{
                                'name': '',
                                'level': 3
                            }]
                        }
                    ]
                }
            }
        }

        case 'REMOVE_SKILL': {
            if (state.values.skills.length <= 1) {
                return state
            }

            return {
                ...state,
                values: {
                    ...state.values,
                    skills: state.values.skills.slice(0, -1)
                }
            }
        }

        case 'ADD_SKILL_KEYWORD': {
            return {
                ...state,
                values: {
                    ...state.values,
                    skills: [
                        ...state.values.skills.slice(0, action.index),
                        {
                            ...state.values.skills[action.index],
                            keywords: [...state.values.skills[action.index].keywords, {
                                'name': '',
                                'level': 3
                            }]
                        },
                        ...state.values.skills.slice(action.index + 1)
                    ]
                }
            }
        }

        case 'REMOVE_SKILL_KEYWORD': {
            if (
                    !state.values.skills[action.index] ||
                    !state.values.skills[action.index].keywords ||
                    state.values.skills[action.index].keywords.length <= 1
            ) {
                return state
            }

            return {
                ...state,
                values: {
                    ...state.values,
                    skills: [
                        ...state.values.skills.slice(0, action.index),
                        {
                            ...state.values.skills[action.index],
                            keywords: state.values.skills[action.index].keywords.slice(0, -1)
                        },
                        ...state.values.skills.slice(action.index + 1)
                    ]
                }
            }
        }

        case 'ADD_PROJECT': {
            return {
                ...state,
                values: {
                    ...state.values,
                    projects: [...state.values.projects, {keywords: ['']}]
                }
            }
        }

        case 'REMOVE_PROJECT': {
            if (state.values.projects.length <= 1) {
                return state
            }

            return {
                ...state,
                values: {
                    ...state.values,
                    projects: state.values.projects.slice(0, -1)
                }
            }
        }

        case 'ADD_PROJECT_KEYWORD': {
            return {
                ...state,
                values: {
                    ...state.values,
                    projects: [
                        ...state.values.projects.slice(0, action.index),
                        {
                            ...state.values.projects[action.index],
                            keywords: [...state.values.projects[action.index].keywords, '']
                        },
                        ...state.values.projects.slice(action.index + 1)
                    ]
                }
            }
        }

        case 'ADD_RESPONSIBILITIES': {
            return {
                ...state,
                values: {
                    ...state.values,
                    projects: [
                        ...state.values.projects.slice(0, action.index),
                        {
                            ...state.values.projects[action.index],
                            responsibilities: [...state.values.projects[action.index].responsibilities, '']
                        },
                        ...state.values.projects.slice(action.index + 1)
                    ]
                }
            }
        }

        case 'REMOVE_PROJECT_KEYWORD': {
            if (
                    !state.values.projects[action.index] ||
                    !state.values.projects[action.index].keywords ||
                    state.values.projects[action.index].keywords.length <= 1
            ) {
                return state
            }

            return {
                ...state,
                values: {
                    ...state.values,
                    projects: [
                        ...state.values.projects.slice(0, action.index),
                        {
                            ...state.values.projects[action.index],
                            keywords: state.values.projects[action.index].keywords.slice(
                                    0,
                                    -1
                            )
                        },
                        ...state.values.projects.slice(action.index + 1)
                    ]
                }
            }
        }

        case 'ADD_RESPONSIBILITY': {
            return {
                ...state,
                values: {
                    ...state.values,
                    projects: [
                        ...state.values.projects.slice(0, action.index),
                        {
                            ...state.values.projects[action.index],
                            responsibilities: [...state.values.projects[action.index].responsibilities, '']
                        },
                        ...state.values.projects.slice(action.index + 1)
                    ]
                }
            }
        }

        case 'REMOVE_RESPONSIBILITY': {
            if (
                    !state.values.projects[action.index] ||
                    !state.values.projects[action.index].responsibilities ||
                    state.values.projects[action.index].responsibilities.length <= 1
            ) {
                return state
            }

            return {
                ...state,
                values: {
                    ...state.values,
                    projects: [
                        ...state.values.projects.slice(0, action.index),
                        {
                            ...state.values.projects[action.index],
                            responsibilities: state.values.projects[action.index].responsibilities.slice(0, -1)
                        },
                            ...state.values.projects.slice(action.index + 1)
                    ]
                }
            }
        }

        case 'ADD_AWARD': {
            return {
                ...state,
                values: {
                    ...state.values,
                    awards: [...state.values.awards, {}]
                }
            }
        }

        case 'REMOVE_AWARD': {
            if (state.values.awards.length <= 1) {
                return state
            }

            return {
                ...state,
                values: {
                    ...state.values,
                    awards: state.values.awards.slice(0, -1)
                }
            }
        }

        default:
            return state
    }
}

export { form, initialState }
export default reducer.plugin({resume: form})
