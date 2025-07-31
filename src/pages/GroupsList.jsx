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
    <div>
      <h1>Discover Groups</h1>
      {user && (
        <div style={{ marginBottom: '1.5rem' }}>
          {!showCreate ? (
            <button
              style={{
                background: 'var(--primary-color)',
                color: 'white',
                padding: '0.5rem 1.2rem',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              onClick={() => setShowCreate(true)}
            >
              + Create Group
            </button>
          ) : (
            <form onSubmit={handleCreateGroup} style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', padding: '1rem', maxWidth: '400px', margin: '0 auto' }}>
              <h3 style={{ marginTop: 0 }}>Create a New Group</h3>
              <input
                type="text"
                placeholder="Group name"
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', marginBottom: '0.7rem', borderRadius: '5px', border: '1px solid #ccc' }}
                required
              />
              <textarea
                placeholder="Description (optional)"
                value={groupDesc}
                onChange={e => setGroupDesc(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', marginBottom: '0.7rem', borderRadius: '5px', border: '1px solid #ccc', minHeight: '60px' }}
              />
              {createError && <p style={{ color: 'red', marginBottom: '0.5rem' }}>{createError}</p>}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  type="submit"
                  style={{ background: 'var(--primary-color)', color: 'white', padding: '0.5rem 1.2rem', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                >Create</button>
                <button
                  type="button"
                  style={{ background: '#ccc', color: '#333', padding: '0.5rem 1.2rem', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                  onClick={() => { setShowCreate(false); setCreateError(''); }}
                >Cancel</button>
              </div>
            </form>
          )}
        </div>
      )}
      <input
        type="text"
        placeholder="Search groups..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '0.5rem', marginBottom: '1rem', width: '100%', maxWidth: '400px' }}
      />
      {loading && <p>Loading groups...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {filteredGroups.length === 0 && !loading && <p>No groups found.</p>}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredGroups.map((group) => (
          <div
            key={group.id}
            style={{
              background: 'white',
              borderRadius: '8px',
              padding: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <h3>{group.name}</h3>
            <p>{group.description || 'No description provided'}</p>
            <p><strong>Members:</strong> {group.member_count}</p>
            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
              <Link to={`/groups/${group.id}/recipes`} style={{
                background: 'var(--primary-color)',
                color: 'white',
                padding: '0.4rem 0.8rem',
                textDecoration: 'none',
                borderRadius: '5px',
                marginRight: '0.5rem'
              }}>
                View
              </Link>
              {!group.current_user_is_member && (
                <button
                  onClick={() => handleJoin(group.id)}
                  style={{
                    background: 'var(--accent-color)',
                    color: 'white',
                    padding: '0.4rem 0.8rem',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
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
                    background: '#d32f2f',
                    color: 'white',
                    padding: '0.4rem 0.8rem',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
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
