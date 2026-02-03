import { useState, type FormEvent } from 'react'

type Stop = {
  id: string
  time: string
  title: string
  note: string
}

const TripPlanner = () => {
  const [view, setView] = useState<'timeline' | 'cards'>('timeline')
  const [stops, setStops] = useState<Stop[]>([
    {
      id: '1',
      time: '09:00',
      title: 'Notting Hill',
      note: 'Colorful streets + market stroll',
    },
    {
      id: '2',
      time: '12:30',
      title: 'Southbank',
      note: 'Lunch and riverside walk',
    },
    {
      id: '3',
      time: '16:00',
      title: 'Covent Garden',
      note: 'Coffee break and live music',
    },
  ])
  const [newStop, setNewStop] = useState('')

  const handleAddStop = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = newStop.trim()
    if (!trimmed) return
    setStops((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        time: '18:00',
        title: trimmed,
        note: 'Custom stop added from prompt.',
      },
    ])
    setNewStop('')
  }

  return (
    <div className="panel">
      <div className="canvas-header">
        <div>
          <h2>Trip Planner</h2>
          <p>One-day itinerary with timeline and map context.</p>
        </div>
        <div className="button-row" role="group" aria-label="Trip views">
          <button
            className={`button ghost${view === 'timeline' ? ' is-active' : ''}`}
            type="button"
            aria-pressed={view === 'timeline'}
            onClick={() => setView('timeline')}
          >
            Timeline
          </button>
          <button
            className={`button ghost${view === 'cards' ? ' is-active' : ''}`}
            type="button"
            aria-pressed={view === 'cards'}
            onClick={() => setView('cards')}
          >
            Cards
          </button>
        </div>
      </div>

      <div className="map-placeholder" aria-label="Map placeholder">
        Map preview
      </div>

      <form className="prompt-form" onSubmit={handleAddStop}>
        <label className="sr-only" htmlFor="stop-input">
          Add stop
        </label>
        <input
          id="stop-input"
          className="prompt-input"
          placeholder="Add a new stop"
          value={newStop}
          onChange={(event) => setNewStop(event.target.value)}
        />
        <button className="button" type="submit">
          Add stop
        </button>
      </form>

      {view === 'timeline' ? (
        <div className="timeline" role="list">
          {stops.map((stop) => (
            <div className="timeline-step" key={stop.id}>
              <strong>{stop.time}</strong>
              <span>{stop.title}</span>
              <small>{stop.note}</small>
            </div>
          ))}
        </div>
      ) : (
        <div className="canvas-grid">
          {stops.map((stop) => (
            <div className="card" key={stop.id}>
              <h3>{stop.title}</h3>
              <p>{stop.time}</p>
              <p>{stop.note}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TripPlanner

