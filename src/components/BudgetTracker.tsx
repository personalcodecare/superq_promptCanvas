import { useMemo, useState } from 'react'

type Transaction = {
  id: string
  title: string
  amount: number
  category: 'groceries' | 'transport' | 'treats'
}

const BudgetTracker = () => {
  const [filter, setFilter] = useState<'all' | Transaction['category']>('all')
  const transactions: Transaction[] = [
    { id: '1', title: 'Market groceries', amount: 38, category: 'groceries' },
    { id: '2', title: 'Subway rides', amount: 12, category: 'transport' },
    { id: '3', title: 'Cafe break', amount: 8, category: 'treats' },
  ]

  const filtered = useMemo(() => {
    if (filter === 'all') return transactions
    return transactions.filter((item) => item.category === filter)
  }, [filter, transactions])

  const total = filtered.reduce((sum, item) => sum + item.amount, 0)

  return (
    <div className="panel">
      <div className="canvas-header">
        <div>
          <h2>Budget Tracker</h2>
          <p>Weekly spend insights with category filters.</p>
        </div>
        <div className="stats">
          <span className="stat">Total: ${total}</span>
          <span className="stat">Budget: $120</span>
        </div>
      </div>

      <div className="button-row" role="group" aria-label="Budget filters">
        {(['all', 'groceries', 'transport', 'treats'] as const).map(
          (option) => (
            <button
              key={option}
              className={`button ghost${filter === option ? ' is-active' : ''}`}
              type="button"
              aria-pressed={filter === option}
              onClick={() => setFilter(option)}
            >
              {option === 'all' ? 'All' : option}
            </button>
          )
        )}
      </div>

      <div className="list">
        {filtered.map((item) => (
          <div className="list-item" key={item.id}>
            <div>
              <strong>{item.title}</strong>
              <p>{item.category}</p>
            </div>
            <span className="pill">${item.amount}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BudgetTracker

