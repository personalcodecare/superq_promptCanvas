import type { TemplateMatch, TemplateType } from '../types'

const templateRules: Array<{
  type: TemplateType
  title: string
  summary: string
  layout: string[]
  keywords: string[]
}> = [
  {
    type: 'taskManager',
    title: 'Task Manager',
    summary: 'Prioritized list with quick status toggles and categories.',
    layout: [
      'Task list panel with status checkboxes',
      'Quick add input + primary action',
      'Category and status filters',
      'Progress snapshot and stats',
    ],
    keywords: ['task', 'todo', 'backlog', 'tracker', 'kanban'],
  },
  {
    type: 'tripPlanner',
    title: 'Trip Planner',
    summary: 'Timeline focused itinerary with map and stops list.',
    layout: [
      'Daily timeline card view',
      'Map placeholder + highlights',
      'Suggested stops list',
      'Quick add stop interaction',
    ],
    keywords: ['trip', 'travel', 'planner', 'itinerary', 'sightseeing', 'route'],
  },
  {
    type: 'studyDashboard',
    title: 'Study Dashboard',
    summary: 'Progress-led dashboard with focus mode controls.',
    layout: [
      'Topic cards with progress bars',
      'Daily goals checklist',
      'Focus mode toggle',
      'Progress summary',
    ],
    keywords: ['study', 'learn', 'course', 'dashboard', 'progress', 'exam'],
  },
  {
    type: 'budgetTracker',
    title: 'Budget Tracker',
    summary: 'Spend breakdown with filters and weekly totals.',
    layout: [
      'Totals strip and spend insights',
      'Transaction list with tags',
      'Category filter toggles',
      'Upcoming reminders panel',
    ],
    keywords: ['budget', 'finance', 'expense', 'cost', 'money', 'spend'],
  },
]

const fallbackTemplate: TemplateMatch = {
  type: 'generic',
  title: 'Quick Canvas',
  summary: 'Adaptable layout with cards, highlights, and actions.',
  layout: [
    'Overview cards based on prompt intent',
    'Quick actions row',
    'Notes and next steps column',
    'Flexible grid of widgets',
  ],
  keywords: [],
}

const normalizePrompt = (prompt: string) =>
  prompt
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

export const mapPromptToTemplate = (prompt: string): TemplateMatch => {
  if (!prompt.trim()) {
    return fallbackTemplate
  }

  const normalized = normalizePrompt(prompt)
  const words = new Set(normalized.split(' '))

  let bestMatch: TemplateMatch | null = null
  let bestScore = 0

  templateRules.forEach((rule) => {
    const matched = rule.keywords.filter((keyword) => words.has(keyword))
    if (matched.length > bestScore) {
      bestScore = matched.length
      bestMatch = {
        type: rule.type,
        title: rule.title,
        summary: rule.summary,
        layout: rule.layout,
        keywords: matched,
      }
    }
  })

  if (!bestMatch || bestScore === 0) {
    return fallbackTemplate
  }

  return bestMatch
}

