import React, { useState } from 'react';
import api from '../services/api';

export default function LeadTable({ leads, refresh }) {
  const [noteMap, setNoteMap] = useState({});

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/leads/${id}`, { status });
      refresh && refresh();
    } catch (err) { console.error(err); }
  };

  const addNote = async (id) => {
    const note = noteMap[id];
    if (!note) return;
    try {
      await api.put(`/leads/${id}`, { note });
      setNoteMap(prev => ({ ...prev, [id]: '' }));
      refresh && refresh();
    } catch (err) { console.error(err); }
  };

  const del = async (id) => {
    if (!window.confirm('Delete lead?')) return;
    try {
      await api.delete(`/leads/${id}`);
      refresh && refresh();
    } catch (err) { console.error(err); }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3 style={{ marginBottom: 15 }}>Leads</h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <thead>
            <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: 10, textAlign: 'left', fontWeight: 600 }}>Name</th>
              <th style={{ padding: 10, textAlign: 'left', fontWeight: 600 }}>Email</th>
              <th style={{ padding: 10, textAlign: 'left', fontWeight: 600 }}>Phone</th>
              <th style={{ padding: 10, textAlign: 'left', fontWeight: 600 }}>Source</th>
              <th style={{ padding: 10, textAlign: 'left', fontWeight: 600 }}>Status</th>
              <th style={{ padding: 10, textAlign: 'left', fontWeight: 600 }}>Notes</th>
              <th style={{ padding: 10, textAlign: 'center', fontWeight: 600 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l, idx) => (
              <tr key={l._id} style={{ borderBottom: '1px solid #eee', background: idx % 2 ? '#fafafa' : 'white' }}>
                <td style={{ padding: 10 }}>{l.name}</td>
                <td style={{ padding: 10 }}>{l.email}</td>
                <td style={{ padding: 10 }}>{l.phone || '-'}</td>
                <td style={{ padding: 10 }}>{l.source || '-'}</td>
                <td style={{ padding: 10 }}>
                  <select 
                    value={l.status} 
                    onChange={(e)=>updateStatus(l._id, e.target.value)}
                    style={{ 
                      padding: '5px 8px', 
                      borderRadius: 4, 
                      border: '1px solid #ddd',
                      background: l.status === 'converted' ? '#c8e6c9' : l.status === 'contacted' ? '#ffe0b2' : '#e3f2fd',
                      cursor: 'pointer',
                      fontWeight: 500
                    }}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                  </select>
                </td>
                <td style={{ padding: 10 }}>
                  <div style={{ maxHeight: 100, overflowY: 'auto', marginBottom: 8 }}>
                    {l.notes && l.notes.length > 0 ? (
                      l.notes.map((n, i) => <div key={i} style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>• {n}</div>)
                    ) : (
                      <div style={{ fontSize: 12, color: '#999' }}>No notes</div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <input 
                      placeholder="Add note" 
                      value={noteMap[l._id] || ''} 
                      onChange={(e)=>setNoteMap(prev=>({ ...prev, [l._id]: e.target.value }))} 
                      style={{ flex: 1, padding: '4px 8px', borderRadius: 4, border: '1px solid #ddd', fontSize: 12 }}
                    />
                    <button 
                      onClick={()=>addNote(l._id)}
                      style={{ padding: '4px 12px', background: '#1976d2', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
                    >
                      Add
                    </button>
                  </div>
                </td>
                <td style={{ padding: 10, textAlign: 'center' }}>
                  <button 
                    onClick={()=>del(l._id)}
                    style={{ padding: '6px 12px', background: '#d32f2f', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12, fontWeight: 600 }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
