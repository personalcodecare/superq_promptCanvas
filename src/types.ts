export type TemplateType =
  | 'taskManager'
  | 'tripPlanner'
  | 'studyDashboard'
  | 'budgetTracker'
  | 'generic'

export interface TemplateMatch {
  type: TemplateType
  title: string
  summary: string
  layout: string[]
  keywords: string[]
}

