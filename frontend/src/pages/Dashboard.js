import React, { useEffect, useState } from 'react';
import api from '../services/api';
import LeadTable from '../components/LeadTable';
import LeadForm from '../components/LeadForm';

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');

  const fetchLeads = async () => {
    try {
      const { data } = await api.get('/leads', { params: { search } });
      setLeads(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchLeads(); }, [search]);

  const totals = {
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    converted: leads.filter(l => l.status === 'converted').length,
  };
  
  const conversionRate = totals.total > 0 ? ((totals.converted / totals.total) * 100).toFixed(1) : 0;

  return (
    <div style={{ padding: '20px 30px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <h1 style={{ color: '#333', marginBottom: 5 }}>Mini CRM Dashboard</h1>
        <p style={{ color: '#999', marginBottom: 25 }}>Manage your leads and track conversions</p>
        
        <div style={{ display: 'flex', gap: 20, marginBottom: 30 }}>
          <div style={{ padding: '10px 15px', background: '#e3f2fd', borderRadius: 5 }}>
            <div style={{ fontSize: 12, color: '#555' }}>Total Leads</div>
            <div style={{ fontSize: 24, fontWeight: 'bold', color: '#1976d2' }}>{totals.total}</div>
          </div>
          <div style={{ padding: '10px 15px', background: '#fff3e0', borderRadius: 5 }}>
            <div style={{ fontSize: 12, color: '#555' }}>New</div>
            <div style={{ fontSize: 24, fontWeight: 'bold', color: '#f57c00' }}>{totals.new}</div>
          </div>
          <div style={{ padding: '10px 15px', background: '#f3e5f5', borderRadius: 5 }}>
            <div style={{ fontSize: 12, color: '#555' }}>Contacted</div>
            <div style={{ fontSize: 24, fontWeight: 'bold', color: '#7b1fa2' }}>{totals.contacted}</div>
          </div>
          <div style={{ padding: '10px 15px', background: '#e8f5e9', borderRadius: 5 }}>
            <div style={{ fontSize: 12, color: '#555' }}>Converted</div>
            <div style={{ fontSize: 24, fontWeight: 'bold', color: '#388e3c' }}>{totals.converted}</div>
          </div>
          <div style={{ padding: '10px 15px', background: '#f1f1f1', borderRadius: 5 }}>
            <div style={{ fontSize: 12, color: '#555' }}>Conversion Rate</div>
            <div style={{ fontSize: 24, fontWeight: 'bold', color: '#555' }}>{conversionRate}%</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <input placeholder="Search leads..." value={search} onChange={(e)=>setSearch(e.target.value)} style={{ padding: '8px 12px', borderRadius: 4, border: '1px solid #ddd', width: 200 }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 1, background: 'white', padding: 20, borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <LeadForm onCreated={fetchLeads} />
          </div>
          <div style={{ flex: 3, background: 'white', padding: 20, borderRadius: 8, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <LeadTable leads={leads} refresh={fetchLeads} />
          </div>
        </div>
      </div>
    </div>
  );
}
