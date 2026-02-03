import { useMemo, useState, type FormEvent } from 'react'
import { promptSuggestions } from './data/promptSuggestions'
import { mapPromptToTemplate } from './utils/promptMapper'
import type { TemplateMatch } from './types'
import TaskManager from './components/TaskManager'
import TripPlanner from './components/TripPlanner'
import StudyDashboard from './components/StudyDashboard'
import BudgetTracker from './components/BudgetTracker'
import GenericCanvas from './components/GenericCanvas'

const DEFAULT_PROMPT = 'Build a simple task manager UI'

const renderTemplate = (template: TemplateMatch) => {
  switch (template.type) {
    case 'taskManager':
      return <TaskManager />
    case 'tripPlanner':
      return <TripPlanner />
    case 'studyDashboard':
      return <StudyDashboard />
    case 'budgetTracker':
      return <BudgetTracker />
    default:
      return <GenericCanvas />
  }
}

const App = () => {
  const [promptInput, setPromptInput] = useState(DEFAULT_PROMPT)
  const [activePrompt, setActivePrompt] = useState(DEFAULT_PROMPT)

  const template = useMemo(
    () => mapPromptToTemplate(activePrompt),
    [activePrompt]
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = promptInput.trim()
    setActivePrompt(trimmed || DEFAULT_PROMPT)
  }

  const handleSuggestionClick = (text: string) => {
    setPromptInput(text)
    setActivePrompt(text)
  }

  const handleReset = () => {
    setPromptInput(DEFAULT_PROMPT)
    setActivePrompt(DEFAULT_PROMPT)
  }

  return (
    <div className="page">
      <header className="top-bar">
        <h1>Prompt Canvas</h1>
        <p>
          Describe the mini-app you want and watch the interface adapt. This is
          a Disco-inspired prototype that simulates prompt-to-layout generation.
        </p>
      </header>

      <main className="content">
        <section className="panel" aria-labelledby="prompt-title">
          <h2 id="prompt-title">Prompt Studio</h2>
          <p>
            Enter a natural language prompt and explore how the layout shifts
            based on intent keywords.
          </p>

          <form className="prompt-form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="prompt-input">
              Prompt input
            </label>
            <input
              id="prompt-input"
              className="prompt-input"
              value={promptInput}
              onChange={(event) => setPromptInput(event.target.value)}
              placeholder="e.g. Plan a one-day sightseeing trip to London"
            />
            <div className="button-row">
              <button className="button" type="submit">
                Generate layout
              </button>
              <button
                className="button secondary"
                type="button"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </form>

          <div className="suggestions" aria-label="Prompt suggestions">
            {promptSuggestions.map((suggestion) => (
              <button
                className="suggestion"
                type="button"
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion.text)}
              >
                {suggestion.text}
                <span>{suggestion.description}</span>
              </button>
            ))}
          </div>

          <div className="insight" aria-live="polite">
            <strong>Prompt mapping:</strong> {template.title}.{' '}
            {template.summary}
            <ul>
              {template.layout.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {template.keywords.length > 0 && (
              <div className="tag-row" aria-label="Detected keywords">
                {template.keywords.map((keyword) => (
                  <span className="tag" key={keyword}>
                    {keyword}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="canvas" aria-labelledby="canvas-title">
          <div className="panel">
            <div className="canvas-header">
              <div>
                <h2 id="canvas-title">Generated Interface</h2>
                <p>{activePrompt}</p>
              </div>
              <div className="button-row">
                <button className="button ghost" type="button">
                  Export layout
                </button>
                <button className="button ghost" type="button">
                  Save preset
                </button>
              </div>
            </div>
          </div>
          {renderTemplate(template)}
        </section>
      </main>

      <footer className="footer">
        Prototype built for the front-end assessment · Dynamic UI simulations
        only.
      </footer>
    </div>
  )
}

export default App

