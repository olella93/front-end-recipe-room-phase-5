import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups, createGroup, deleteGroup } from '../features/groups/groupsSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { joinGroup } from '../features/groups/groupsSlice';

export default function GroupsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, error } = useSelector((state) => state.groups);
  const { user } = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDesc, setGroupDesc] = useState('');
  const [createError, setCreateError] = useState('');
  const handleCreateGroup = (e) => {
    e.preventDefault();
    setCreateError('');
    if (!groupName.trim()) {
      setCreateError('Group name is required');
      return;
    }
    dispatch(createGroup({ name: groupName, description: groupDesc }))
      .unwrap()
      .then(() => {
        setShowCreate(false);
        setGroupName('');
        setGroupDesc('');
      })
      .catch((err) => {
        setCreateError(err?.toString() || 'Failed to create group');
      });
  };

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  const handleJoin = (groupId) => {
    if (!user) {
      alert('You must be logged in to join a group.');
      return;
    }
    dispatch(joinGroup(groupId)).then(() => {
      navigate(`/groups/${groupId}/recipes`);
    });
  };

  const filteredGroups = list.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ background: 'linear-gradient(135deg, #fff7f0 0%, #ffe5d0 100%)', minHeight: '100vh', paddingBottom: '2rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '3rem 1rem 2rem 1rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ff5e62', letterSpacing: '-1px', marginBottom: 8 }}>Discover Groups</h1>
        <p style={{ color: '#7a5c3e', fontSize: '1.15rem', maxWidth: 600, margin: '0 auto' }}>
          Join a group to share and discover recipes with others! Search, create, or join groups below.
        </p>
      </div>
      {user && (
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
          {!showCreate ? (
            <button
              style={{
                background: 'linear-gradient(90deg, #ff9966 0%, #ff5e62 100%)',
                color: '#fff',
                padding: '0.7rem 2rem',
                borderRadius: 12,
                fontWeight: 700,
                fontSize: '1.1rem',
                border: 'none',
                boxShadow: '0 2px 8px rgba(255,153,102,0.08)',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onClick={() => setShowCreate(true)}
            >
              + Create Group
            </button>
          ) : (
            <form onSubmit={handleCreateGroup} style={{ background: '#fff', borderRadius: '14px', boxShadow: '0 2px 16px rgba(255,153,102,0.10)', padding: '2rem 1.5rem', maxWidth: '420px', margin: '0 auto' }}>
              <h3 style={{ marginTop: 0, color: '#ff5e62', fontWeight: 700, fontSize: '1.3rem' }}>Create a New Group</h3>
              <input
                type="text"
                placeholder="Group name"
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', marginBottom: '0.9rem', borderRadius: '8px', border: '1.5px solid #ffb88c', fontSize: '1.08rem' }}
                required
              />
              <textarea
                placeholder="Description (optional)"
                value={groupDesc}
                onChange={e => setGroupDesc(e.target.value)}
                style={{ width: '100%', padding: '0.7rem', marginBottom: '0.9rem', borderRadius: '8px', border: '1.5px solid #ffb88c', minHeight: '60px', fontSize: '1.08rem' }}
              />
              {createError && <p style={{ color: 'red', marginBottom: '0.5rem' }}>{createError}</p>}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button
                  type="submit"
                  style={{ background: 'linear-gradient(90deg, #ff9966 0%, #ff5e62 100%)', color: '#fff', padding: '0.6rem 1.6rem', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '1.08rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(255,153,102,0.08)' }}
                >Create</button>
                <button
                  type="button"
                  style={{ background: '#eee', color: '#a04a00', padding: '0.6rem 1.6rem', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '1.08rem', cursor: 'pointer' }}
                  onClick={() => { setShowCreate(false); setCreateError(''); }}
                >Cancel</button>
              </div>
            </form>
          )}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Search groups..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '0.7rem 1.2rem', borderRadius: 24, border: '1.5px solid #ffb88c', fontSize: '1.08rem', width: '100%', maxWidth: 400, boxShadow: '0 2px 8px rgba(255,153,102,0.06)' }}
        />
      </div>
      {loading && <p>Loading groups...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {filteredGroups.length === 0 && !loading && <p>No groups found.</p>}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
        maxWidth: 1100,
        margin: '0 auto',
        marginBottom: 32
      }}>
        {filteredGroups.map((group) => (
          <div
            key={group.id}
            style={{
              background: '#fff',
              borderRadius: 18,
              boxShadow: '0 2px 16px rgba(255,153,102,0.10)',
              padding: '2rem 1.5rem 1.5rem 1.5rem',
              overflow: 'hidden',
              transition: 'box-shadow 0.2s',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: 220
            }}
            onMouseOver={e => e.currentTarget.style.boxShadow = '0 4px 24px rgba(255,153,102,0.18)'}
            onMouseOut={e => e.currentTarget.style.boxShadow = '0 2px 16px rgba(255,153,102,0.10)'}
          >
            <div style={{ width: 54, height: 54, borderRadius: '50%', background: 'linear-gradient(135deg,#ff9966 0%,#ff5e62 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18, boxShadow: '0 2px 8px rgba(255,153,102,0.10)' }}>
              <span style={{ fontSize: 28, color: '#fff', fontWeight: 700 }}>{group.name.charAt(0).toUpperCase()}</span>
            </div>
            <h3 style={{ fontWeight: 700, color: '#ff5e62', fontSize: '1.25rem', marginBottom: 6, textAlign: 'center' }}>{group.name}</h3>
            <p style={{ color: '#7a5c3e', fontSize: '1.05rem', marginBottom: 10, textAlign: 'center', minHeight: 36 }}>{group.description || 'No description provided'}</p>
            <p style={{ color: '#a04a00', fontWeight: 600, fontSize: '1.01rem', marginBottom: 8 }}><span style={{ color: '#ff9966', fontWeight: 700 }}>👥</span> {group.member_count} members</p>
            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.7rem', justifyContent: 'center' }}>
              <Link to={`/groups/${group.id}/recipes`} style={{
                background: 'linear-gradient(90deg, #ff9966 0%, #ff5e62 100%)',
                color: '#fff',
                padding: '0.5rem 1.3rem',
                textDecoration: 'none',
                borderRadius: 8,
                fontWeight: 700,
                fontSize: '1.05rem',
                boxShadow: '0 2px 8px rgba(255,153,102,0.08)',
                transition: 'background 0.2s',
                border: 'none'
              }}>
                View
              </Link>
              {!group.current_user_is_member && (
                <button
                  onClick={() => handleJoin(group.id)}
                  style={{
                    background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)',
                    color: '#fff',
                    padding: '0.5rem 1.3rem',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(67,233,123,0.08)',
                    transition: 'background 0.2s'
                  }}
                >
                  Join
                </button>
              )}
              {user && group.current_user_is_admin && (
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this group? This action cannot be undone.')) {
                      dispatch(deleteGroup(group.id));
                    }
                  }}
                  style={{
                    background: 'linear-gradient(90deg, #d32f2f 0%, #ff5e62 100%)',
                    color: '#fff',
                    padding: '0.5rem 1.3rem',
                    border: 'none',
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: '1.05rem',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(211,47,47,0.08)',
                    transition: 'background 0.2s'
                  }}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
