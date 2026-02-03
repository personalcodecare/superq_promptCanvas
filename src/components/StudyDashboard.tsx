import { useState } from 'react'

type Topic = {
  id: string
  title: string
  progress: number
  nextStep: string
}

const StudyDashboard = () => {
  const [focusMode, setFocusMode] = useState(false)
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: '1',
      title: 'Quantum Basics',
      progress: 72,
      nextStep: 'Review wave-particle duality',
    },
    {
      id: '2',
      title: 'Electromagnetism',
      progress: 54,
      nextStep: 'Practice field line problems',
    },
    {
      id: '3',
      title: 'Thermodynamics',
      progress: 38,
      nextStep: 'Complete entropy exercises',
    },
  ])

  const handleBoost = (topicId: string) => {
    setTopics((prev) =>
      prev.map((topic) =>
        topic.id === topicId
          ? { ...topic, progress: Math.min(topic.progress + 10, 100) }
          : topic
      )
    )
  }

  return (
    <div className="panel">
      <div className="canvas-header">
        <div>
          <h2>Study Dashboard</h2>
          <p>Progress-led focus with quick boost actions.</p>
        </div>
        <button
          className="button secondary"
          type="button"
          onClick={() => setFocusMode((prev) => !prev)}
        >
          {focusMode ? 'Exit focus mode' : 'Enter focus mode'}
        </button>
      </div>

      {!focusMode && (
        <div className="stats">
          <span className="stat">3 topics in flight</span>
          <span className="stat">2 sessions today</span>
          <span className="stat">1 exam in 12 days</span>
        </div>
      )}

      <div className="canvas-grid" role="list">
        {topics.map((topic) => (
          <div className="card" key={topic.id}>
            <h3>{topic.title}</h3>
            <p>{topic.nextStep}</p>
            <div className="progress-row" aria-label={`${topic.title} progress`}>
              <div className="progress-bar">
                <span style={{ width: `${topic.progress}%` }} />
              </div>
              <span className="pill">{topic.progress}%</span>
            </div>
            {!focusMode && (
              <button
                className="button ghost"
                type="button"
                onClick={() => handleBoost(topic.id)}
              >
                Boost 10%
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudyDashboard

