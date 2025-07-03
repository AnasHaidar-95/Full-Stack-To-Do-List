import React from 'react'
import TodoList from './components/TodoList'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          My To-Do List
        </h1>
        <TodoList />
      </div>
    </div>
  )
}
