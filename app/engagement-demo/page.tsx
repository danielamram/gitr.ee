"use client"

import { CodeExplainer } from "@/components/ai-features/code-explainer"
import { CodeChallenge } from "@/components/ai-features/code-challenge"
import { PersonalizedFeed } from "@/components/ai-features/personalized-feed"
import { CodeCompletion } from "@/components/ai-features/code-completion"
import { StreakTracker } from "@/components/engagement/streak-tracker"
import { DailyChallenge } from "@/components/engagement/daily-challenge"
import { CommunityActivity } from "@/components/engagement/community-activity"

// Sample code for the explainer
const sampleCode = `function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build an app', completed: false }
  ])
  const [newTodo, setNewTodo] = useState('')
  
  const addTodo = async (e) => {
    e.preventDefault()
    
    // Generate a temporary ID
    const tempId = Date.now()
    
    // Optimistically update the UI
    setTodos(prev => [
      ...prev, 
      { id: tempId, text: newTodo, completed: false }
    ])
    setNewTodo('')
    
    try {
      // Send the request to the server
      const response = await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ text: newTodo }),
        headers: { 'Content-Type': 'application/json' }
      })
      
      const data = await response.json()
      
      // Update with the real ID from the server
      setTodos(prev => prev.map(todo => 
        todo.id === tempId ? { ...todo, id: data.id } : todo
      ))
    } catch (error) {
      // If there's an error, revert the optimistic update
      setTodos(prev => prev.filter(todo => todo.id !== tempId))
      alert('Failed to add todo')
    }
  }
  
  return (
    <div>
      <form onSubmit={addTodo}>
        <input
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  )
}`

export default function EngagementDemo() {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">AI-Powered Engagement Features</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <CodeExplainer code={sampleCode} language="jsx" title="Optimistic UI Updates Explained" />
          <PersonalizedFeed />
          <DailyChallenge />
        </div>

        <div className="space-y-6">
          <CodeCompletion />
          <StreakTracker />
          <CommunityActivity />
        </div>
      </div>

      <div className="mt-8">
        <CodeChallenge />
      </div>
    </div>
  )
}
