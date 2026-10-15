import { useState, useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [inputValue, setInputValue] = useState('');
  
  // Güncelleme işlemi için gereken yeni state'ler
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (inputValue.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: inputValue }]);
    setInputValue('');
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Güncelleme Fonksiyonları
  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditValue(todo.text);
  };

  const saveEdit = (id) => {
    if (editValue.trim() === '') return;
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: editValue } : todo));
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Görev Yöneticisi</h1>
        
        {/* Ekleme Alanı */}
        <div className="flex gap-2 mb-6">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:border-blue-500"
            placeholder="Yeni görev ekle..."
          />
          <button 
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition font-medium"
          >
            Ekle
          </button>
        </div>

        {/* Listeleme ve Güncelleme Alanı */}
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li key={todo.id} className="flex justify-between items-center bg-gray-50 p-3 rounded border border-gray-200">
              {editingId === todo.id ? (
                <div className="flex gap-2 w-full">
                  <input 
                    type="text" 
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-2 py-1 outline-none focus:border-green-500"
                  />
                  <button onClick={() => saveEdit(todo.id)} className="text-sm bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition">Kaydet</button>
                  <button onClick={() => setEditingId(null)} className="text-sm bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500 transition">İptal</button>
                </div>
              ) : (
                <>
                  <span className="text-gray-700">{todo.text}</span>
                  <div className="flex gap-2">
                    <button onClick={() => startEditing(todo)} className="text-sm bg-yellow-400 text-white px-2 py-1 rounded hover:bg-yellow-500 transition">Güncelle</button>
                    <button onClick={() => handleDelete(todo.id)} className="text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">Sil</button>
                  </div>
                </>
              )}
            </li>
          ))}
          {todos.length === 0 && (
            <p className="text-center text-gray-500 text-sm">Henüz bir görev eklenmedi.</p>
          )}
        </ul>
      </div>
    </div>
  )
}

export default App