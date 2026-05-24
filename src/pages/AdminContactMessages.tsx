import { useState, useEffect } from 'react';
import { adminApi } from '../api/admin';
import { ConfirmDialog } from '../components/admin/ConfirmDialog';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  createdAt: string;
}

export function AdminContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    try {
      const msgs = await adminApi.getContactMessages();
      setMessages(msgs as ContactMessage[]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleStatusChange(id: number, status: string) {
    try {
      await adminApi.updateContactMessage(id, { status });
      setMessage({ type: 'success', text: `Message marked as ${status}` });
      load();
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to update status' });
    }
  }

  async function handleDelete(id: number) {
    setDeleting(true);
    try {
      await adminApi.deleteContactMessage(id);
      setMessage({ type: 'success', text: 'Message deleted!' });
      setDeleteTarget(null);
      load();
    } catch (err) {
      setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Failed to delete' });
    } finally {
      setDeleting(false);
    }
  }

  if (loading) return <div className="p-6 flex justify-center"><div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Contact Messages</h1>
      {message && (
        <div className={`mb-4 p-3 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text} <button onClick={() => setMessage(null)} className="float-right font-bold">&times;</button>
        </div>
      )}

      {messages.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-6xl mb-4">✉️</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No messages yet</h3>
          <p className="text-gray-500">Customer inquiries will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map(m => (
            <div key={m.id} className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${m.status === 'unread' ? 'border-red-500' : m.status === 'read' ? 'border-blue-500' : 'border-gray-300'}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-gray-900">{m.name}</h3>
                  <p className="text-sm text-gray-500">{m.email}{m.phone ? ` · ${m.phone}` : ''}</p>
                  {m.subject && <p className="text-sm font-medium text-gray-700 mt-1">{m.subject}</p>}
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <span>{new Date(m.createdAt).toLocaleDateString()}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    m.status === 'unread' ? 'bg-red-100 text-red-700' :
                    m.status === 'read' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                  }`}>{m.status}</span>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3 whitespace-pre-wrap">{m.message}</p>
              <div className="flex space-x-2">
                {m.status !== 'read' && (
                  <button onClick={() => handleStatusChange(m.id, 'read')} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-200">
                    Mark Read
                  </button>
                )}
                {m.status !== 'archived' && (
                  <button onClick={() => handleStatusChange(m.id, 'archived')} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-200">
                    Archive
                  </button>
                )}
                {m.status !== 'unread' && (
                  <button onClick={() => handleStatusChange(m.id, 'unread')} className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full hover:bg-yellow-200">
                    Mark Unread
                  </button>
                )}
                <button onClick={() => setDeleteTarget({ id: m.id, name: m.name })} className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full hover:bg-red-200">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteTarget !== null}
        title="Delete Message"
        message={`Are you sure you want to delete the message from "${deleteTarget?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={() => deleteTarget && handleDelete(deleteTarget.id)}
        onCancel={() => setDeleteTarget(null)}
        isLoading={deleting}
      />
    </div>
  );
}