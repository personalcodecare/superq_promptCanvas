const GenericCanvas = () => {
  return (
    <div className="panel">
      <div className="canvas-header">
        <div>
          <h2>Quick Canvas</h2>
          <p>Flexible cards and actions for new ideas.</p>
        </div>
        <div className="button-row">
          <button className="button secondary" type="button">
            Add widget
          </button>
          <button className="button ghost" type="button">
            Rename
          </button>
        </div>
      </div>

      <div className="canvas-grid">
        <div className="card">
          <h3>Highlights</h3>
          <p>Capture goals, blockers, and quick wins.</p>
        </div>
        <div className="card">
          <h3>Notes</h3>
          <p>Short-form ideas and follow-up steps.</p>
        </div>
        <div className="card">
          <h3>Actions</h3>
          <p>Assign owners, due dates, and status.</p>
        </div>
      </div>
    </div>
  )
}

export default GenericCanvas

