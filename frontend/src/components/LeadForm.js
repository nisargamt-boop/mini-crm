import React, { useState } from 'react';
import api from '../services/api';

export default function LeadForm({ onCreated }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [source, setSource] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/leads', { name, email, phone, source });
      setName(''); setEmail(''); setPhone(''); setSource('');
      onCreated && onCreated();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ background: '#f9f9f9', padding: 20, borderRadius: 8, border: '1px solid #eee' }}>
      <h3 style={{ marginTop: 0, marginBottom: 15, color: '#333' }}>Add New Lead</h3>
      <form onSubmit={submit}>
        <div style={{ marginBottom: 12 }}>
          <input 
            placeholder="Name *" 
            value={name} 
            onChange={(e)=>setName(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', borderRadius: 4, border: '1px solid #ddd', boxSizing: 'border-box', fontSize: 14 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <input 
            placeholder="Email *" 
            type="email"
            value={email} 
            onChange={(e)=>setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '10px', borderRadius: 4, border: '1px solid #ddd', boxSizing: 'border-box', fontSize: 14 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <input 
            placeholder="Phone" 
            value={phone} 
            onChange={(e)=>setPhone(e.target.value)} 
            style={{ width: '100%', padding: '10px', borderRadius: 4, border: '1px solid #ddd', boxSizing: 'border-box', fontSize: 14 }}
          />
        </div>
        <div style={{ marginBottom: 12 }}>
          <input 
            placeholder="Source (e.g., Website, Referral)" 
            value={source} 
            onChange={(e)=>setSource(e.target.value)} 
            style={{ width: '100%', padding: '10px', borderRadius: 4, border: '1px solid #ddd', boxSizing: 'border-box', fontSize: 14 }}
          />
        </div>
        <button 
          type="submit"
          style={{ width: '100%', padding: '10px', background: '#1976d2', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 14, fontWeight: 600 }}
        >
          Create Lead
        </button>
      </form>
    </div>
  );
}
