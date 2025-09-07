import React, { useState } from 'react';
import Card from './Card';
import usePersistentState from '../hooks/usePersistentState';

const EnhancedNotes = () => {
  const [activeTab, setActiveTab] = useState('sessions');
  const [sessions, setSessions] = usePersistentState('campaignSessions', []);
  const [characters, setCharacters] = usePersistentState('campaignCharacters', []);
  const [locations, setLocations] = usePersistentState('campaignLocations', []);
  const [quickNotes, setQuickNotes] = usePersistentState('quickNotes', '');
  const [background, setBackground] = usePersistentState('characterBackground', '');
  
  const [newSession, setNewSession] = useState({ title: '', date: '', notes: '' });
  const [newCharacter, setNewCharacter] = useState({
    name: '',
    role: '',
    race: '',
    height: '',
    weight: '',
    gender: '',
    characterClass: '',
    description: '',
    notes: '',
    status: 'alive'
  });
  const [newLocation, setNewLocation] = useState({ name: '', type: '', description: '', notes: '' });
  const [editingItem, setEditingItem] = useState(null);
  const [collapsedSessions, setCollapsedSessions] = usePersistentState('collapsedSessions', {});
  const [collapsedCharacters, setCollapsedCharacters] = usePersistentState('collapsedCharacters', {});
  const [collapsedLocations, setCollapsedLocations] = usePersistentState('collapsedLocations', {});

  const addSession = () => {
    if (newSession.title.trim()) {
      setSessions([...sessions, { ...newSession, id: Date.now() }]);
      setNewSession({ title: '', date: '', notes: '' });
    }
  };

  const addCharacter = () => {
    if (newCharacter.name.trim()) {
      setCharacters([...characters, { ...newCharacter, id: Date.now() }]);
      setNewCharacter({ name: '', role: '', description: '', notes: '', status: 'alive' });
    }
  };

  const addLocation = () => {
    if (newLocation.name.trim()) {
      setLocations([...locations, { ...newLocation, id: Date.now() }]);
      setNewLocation({ name: '', type: '', description: '', notes: '' });
    }
  };

  const deleteItem = (type, id) => {
    switch (type) {
      case 'session':
        setSessions(sessions.filter(s => s.id !== id));
        break;
      case 'character':
        setCharacters(characters.filter(c => c.id !== id));
        break;
      case 'location':
        setLocations(locations.filter(l => l.id !== id));
        break;
    }
  };

  // Separated update logic - this updates the data without exiting edit mode
  const updateItemData = (type, id, updatedData) => {
    switch (type) {
      case 'session':
        setSessions(sessions.map(s => s.id === id ? { ...s, ...updatedData } : s));
        break;
      case 'character':
        setCharacters(characters.map(c => c.id === id ? { ...c, ...updatedData } : c));
        break;
      case 'location':
        setLocations(locations.map(l => l.id === id ? { ...l, ...updatedData } : l));
        break;
    }
  };

  // This function only exits edit mode (called by Done button)
  const finishEditing = () => {
    setEditingItem(null);
  };

  const toggleSessionCollapse = (id) => {
    setCollapsedSessions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCharacterCollapse = (id) => {
    setCollapsedCharacters(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const collapseAllSessions = () => {
    const all = sessions.reduce((acc, s) => ({ ...acc, [s.id]: true }), {});
    setCollapsedSessions(all);
  };

  const expandAllSessions = () => {
    const all = sessions.reduce((acc, s) => ({ ...acc, [s.id]: false }), {});
    setCollapsedSessions(all);
  };

  const collapseAllCharacters = () => {
    const all = characters.reduce((acc, c) => ({ ...acc, [c.id]: true }), {});
    setCollapsedCharacters(all);
  };

  const expandAllCharacters = () => {
    const all = characters.reduce((acc, c) => ({ ...acc, [c.id]: false }), {});
    setCollapsedCharacters(all);
  };

  const toggleLocationCollapse = (id) => {
    setCollapsedLocations(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const collapseAllLocations = () => {
    const all = locations.reduce((acc, l) => ({ ...acc, [l.id]: true }), {});
    setCollapsedLocations(all);
  };

  const expandAllLocations = () => {
    const all = locations.reduce((acc, l) => ({ ...acc, [l.id]: false }), {});
    setCollapsedLocations(all);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'alive': return 'text-green-600';
      case 'dead': return 'text-sealWax';
      case 'missing': return 'text-yellow-600';
      case 'hostile': return 'text-red-600';
      case 'friendly': return 'text-green-600';
      case 'neutral': return 'text-artificerBlue';
      default: return 'parchment-text';
    }
  };

  const getLocationTypeIcon = (type) => {
    switch (type) {
      case 'city': return '🏙️';
      case 'dungeon': return '🏰';
      case 'wilderness': return '🌲';
      case 'shop': return '🏪';
      case 'tavern': return '🍺';
      case 'temple': return '⛪';
      case 'castle': return '🏰';
      case 'cave': return '🕳️';
      default: return '📍';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Notes */}
      <Card>
        <Card.Header>Quick Notes</Card.Header>
        <Card.Content>
          <textarea
            value={quickNotes}
            onChange={(e) => setQuickNotes(e.target.value)}
            className="w-full h-32 parchment-card rounded p-3 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none resize-none"
            placeholder="Quick notes and reminders for your next session..."
          />
        </Card.Content>
      </Card>

      {/* Character Background */}
      <Card>
        <Card.Header>Character Background</Card.Header>
        <Card.Content>
          <textarea
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            className="w-full h-40 parchment-card rounded p-3 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none resize-none"
            placeholder="Your character's story, background, and personal notes..."
          />
        </Card.Content>
      </Card>

      {/* Main Notes Tabs */}
      <Card>
        <Card.Header>Campaign Notes</Card.Header>
        <Card.Content>
          <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex space-x-2 overflow-x-auto scrollbar-custom">
              {['sessions', 'characters', 'locations'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-artificerBronze/80 text-white border border-artificerBronze'
                      : 'parchment-card parchment-text-light hover:shadow-md'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Sessions Tab */}
            {activeTab === 'sessions' && (
              <div className="space-y-4">
                {/* Add New Session */}
                <div className="parchment-card p-4 rounded-lg">
                  <h3 className="parchment-text font-semibold mb-3">Add New Session</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={newSession.title}
                      onChange={(e) => setNewSession({...newSession, title: e.target.value})}
                      className="parchment-card rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none"
                      placeholder="Session Title"
                    />
                    <input
                      type="date"
                      value={newSession.date}
                      onChange={(e) => setNewSession({...newSession, date: e.target.value})}
                      className="parchment-card rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none"
                    />
                  </div>
                  <textarea
                    value={newSession.notes}
                    onChange={(e) => setNewSession({...newSession, notes: e.target.value})}
                    className="w-full mt-3 h-24 parchment-card rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none resize-none"
                    placeholder="Session notes..."
                  />
                  <button
                    onClick={addSession}
                    className="mt-3 bg-tortleGreen/20 hover:bg-tortleGreen/30 text-white px-4 py-2 rounded text-sm button-glow"
                  >
                    Add Session
                  </button>
                </div>

                {/* Sessions List */}
                <div className="flex items-center justify-end gap-2 mb-2 flex-wrap">
                  <button onClick={collapseAllSessions} className="text-xs px-2 py-1 parchment-card hover:shadow">Collapse All</button>
                  <button onClick={expandAllSessions} className="text-xs px-2 py-1 parchment-card hover:shadow">Expand All</button>
                </div>
                <div className="space-y-3">
                  {sessions.map(session => (
                    <div key={session.id} className="parchment-card p-4 rounded-lg border border-artificerBronze/20">
                      {editingItem?.type === 'session' && editingItem?.id === session.id ? (
                        // EDIT MODE
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={session.title}
                            onChange={(e) => updateItemData('session', session.id, { title: e.target.value })}
                            className="w-full parchment-card rounded p-2 parchment-text border border-artificerBronze/30"
                            placeholder="Session Title"
                          />
                          <input
                            type="date"
                            value={session.date}
                            onChange={(e) => updateItemData('session', session.id, { date: e.target.value })}
                            className="w-full parchment-card rounded p-2 parchment-text border border-artificerBronze/30"
                          />
                          <textarea
                            value={session.notes}
                            onChange={(e) => updateItemData('session', session.id, { notes: e.target.value })}
                            className="w-full h-24 parchment-card rounded p-2 parchment-text border border-artificerBronze/30 resize-none"
                            placeholder="Session notes..."
                          />
                          <button
                            onClick={finishEditing}
                            className="mt-2 bg-tortleGreen/20 px-3 py-1 rounded text-white hover:bg-tortleGreen/30"
                          >
                            Done
                          </button>
                        </div>
                      ) : (
                        // VIEW MODE
                        <>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="parchment-text font-semibold">{session.title}</h3>
                              <div className="parchment-text-light text-sm">{session.date}</div>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap justify-end">
                              <button
                                onClick={() => toggleSessionCollapse(session.id)}
                                className="text-sm parchment-text-light hover:parchment-text"
                                title={collapsedSessions[session.id] ? 'Expand' : 'Collapse'}
                              >
                                {collapsedSessions[session.id] ? 'Expand' : 'Collapse'}
                              </button>
                              <button
                                onClick={() => setEditingItem({ type: 'session', id: session.id })}
                                className="text-artificerBlue hover:text-artificerBlue/80 text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteItem('session', session.id)}
                                className="text-red-400 hover:text-red-300 text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                          {!collapsedSessions[session.id] && (
                            <p className="parchment-text-light text-sm" style={{ whiteSpace: 'pre-wrap' }}>{session.notes}</p>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Characters Tab */}
            {activeTab === 'characters' && (
              <div className="space-y-4">
                {/* Add New Character */}
                <div className="parchment-card p-4 rounded-lg">
                  <h3 className="parchment-text font-semibold mb-3">Add New Character</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={newCharacter.name}
                      onChange={(e) => setNewCharacter({...newCharacter, name: e.target.value})}
                      className="parchment-card rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none"
                      placeholder="Character Name"
                    />
                    <input
                      type="text"
                      value={newCharacter.role}
                      onChange={(e) => setNewCharacter({...newCharacter, role: e.target.value})}
                      className="parchment-card rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none"
                      placeholder="Role (NPC, Ally, Enemy, etc.)"
                    />
                    <input
                      type="text"
                      value={newCharacter.race}
                      onChange={(e) => setNewCharacter({ ...newCharacter, race: e.target.value })}
                      className="parchment-card rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none"
                      placeholder="Race (e.g., Tortle, Human, Elf)"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={newCharacter.height}
                        onChange={(e) => setNewCharacter({ ...newCharacter, height: e.target.value })}
                        className="parchment-card rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none"
                        placeholder="Height (e.g., 5 ft 8 in)"
                      />
                      <input
                        type="text"
                        value={newCharacter.weight}
                        onChange={(e) => setNewCharacter({ ...newCharacter, weight: e.target.value })}
                        className="parchment-card rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none"
                        placeholder="Weight (e.g., 160 lb)"
                      />
                    </div>
                    <input
                      type="text"
                      value={newCharacter.gender}
                      onChange={(e) => setNewCharacter({ ...newCharacter, gender: e.target.value })}
                      className="parchment-card rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none"
                      placeholder="Gender"
                    />
                    <input
                      type="text"
                      value={newCharacter.characterClass}
                      onChange={(e) => setNewCharacter({ ...newCharacter, characterClass: e.target.value })}
                      className="parchment-card rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none"
                      placeholder="Class"
                    />
                    <select
                      value={newCharacter.status}
                      onChange={(e) => setNewCharacter({...newCharacter, status: e.target.value})}
                      className="parchment-card rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none"
                    >
                      <option value="alive" className="bg-gray-800 text-white">Alive</option>
                      <option value="dead" className="bg-gray-800 text-white">Dead</option>
                      <option value="missing" className="bg-gray-800 text-white">Missing</option>
                      <option value="hostile" className="bg-gray-800 text-white">Hostile</option>
                      <option value="friendly" className="bg-gray-800 text-white">Friendly</option>
                      <option value="neutral" className="bg-gray-800 text-white">Neutral</option>
                    </select>
                  </div>
                  <textarea
                    value={newCharacter.description}
                    onChange={(e) => setNewCharacter({...newCharacter, description: e.target.value})}
                    className="w-full mt-3 h-20 parchment-card rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none resize-none"
                    placeholder="Character description..."
                  />
                  <textarea
                    value={newCharacter.notes}
                    onChange={(e) => setNewCharacter({...newCharacter, notes: e.target.value})}
                    className="w-full mt-3 h-20 parchment-card rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none resize-none"
                    placeholder="Personal notes about this character..."
                  />
                  <button
                    onClick={addCharacter}
                    className="mt-3 bg-artificerBronze/80 hover:bg-artificerBronze text-white px-4 py-2 rounded text-sm button-glow"
                  >
                    Add Character
                  </button>
                </div>

                {/* Characters List */}
                <div className="flex items-center justify-end gap-2 mb-2 flex-wrap">
                  <button onClick={collapseAllCharacters} className="text-xs px-2 py-1 parchment-card hover:shadow">Collapse All</button>
                  <button onClick={expandAllCharacters} className="text-xs px-2 py-1 parchment-card hover:shadow">Expand All</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {characters.map(character => (
                    <div key={character.id} className="parchment-card p-4 rounded-lg border border-artificerBronze/20">
                      {editingItem?.type === 'character' && editingItem?.id === character.id ? (
                        // EDIT MODE
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={character.name}
                            onChange={(e) => updateItemData('character', character.id, { name: e.target.value })}
                            className="w-full parchment-card rounded p-2 parchment-text border border-artificerBronze/30"
                          />
                          <input
                            type="text"
                            value={character.role}
                            onChange={(e) => updateItemData('character', character.id, { role: e.target.value })}
                            className="w-full parchment-card rounded p-2 parchment-text border border-artificerBronze/30"
                          />
                          <input
                            type="text"
                            value={character.race || ''}
                            onChange={(e) => updateItemData('character', character.id, { race: e.target.value })}
                            className="w-full parchment-card rounded p-2 parchment-text border border-artificerBronze/30"
                            placeholder="Race (e.g., Tortle, Human, Elf)"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={character.height || ''}
                              onChange={(e) => updateItemData('character', character.id, { height: e.target.value })}
                              className="w-full parchment-card rounded p-2 parchment-text border border-artificerBronze/30"
                              placeholder="Height (e.g., 5 ft 8 in)"
                            />
                            <input
                              type="text"
                              value={character.weight || ''}
                              onChange={(e) => updateItemData('character', character.id, { weight: e.target.value })}
                              className="w-full parchment-card rounded p-2 parchment-text border border-artificerBronze/30"
                              placeholder="Weight (e.g., 160 lb)"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={character.gender || ''}
                              onChange={(e) => updateItemData('character', character.id, { gender: e.target.value })}
                              className="w-full parchment-card rounded p-2 parchment-text border border-artificerBronze/30"
                              placeholder="Gender"
                            />
                            <input
                              type="text"
                              value={character.characterClass || ''}
                              onChange={(e) => updateItemData('character', character.id, { characterClass: e.target.value })}
                              className="w-full parchment-card rounded p-2 parchment-text border border-artificerBronze/30"
                              placeholder="Class"
                            />
                          </div>
                          <select
                            value={character.status}
                            onChange={(e) => updateItemData('character', character.id, { status: e.target.value })}
                            className="w-full bg-gray-800 text-white rounded p-2 border border-white/20"
                          >
                            <option value="alive" className="bg-gray-800 text-white">Alive</option>
                            <option value="dead" className="bg-gray-800 text-white">Dead</option>
                            <option value="missing" className="bg-gray-800 text-white">Missing</option>
                            <option value="hostile" className="bg-gray-800 text-white">Hostile</option>
                            <option value="friendly" className="bg-gray-800 text-white">Friendly</option>
                            <option value="neutral" className="bg-gray-800 text-white">Neutral</option>
                          </select>
                          <textarea
                            value={character.description}
                            onChange={(e) => updateItemData('character', character.id, { description: e.target.value })}
                            className="w-full parchment-card rounded p-2 parchment-text border border-artificerBronze/30 resize-none"
                          />
                          <textarea
                            value={character.notes}
                            onChange={(e) => updateItemData('character', character.id, { notes: e.target.value })}
                            className="w-full parchment-card rounded p-2 parchment-text border border-artificerBronze/30 resize-none"
                          />
                          <button
                            onClick={finishEditing}
                            className="mt-2 bg-tortleGreen/20 px-3 py-1 rounded text-white hover:bg-tortleGreen/30"
                          >
                            Done
                          </button>
                        </div>
                      ) : (
                        // VIEW MODE
                        <>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="parchment-text font-semibold">{character.name}</h3>
                              <div className="parchment-text-light text-sm">{character.role}</div>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap justify-end">
                              <span className={`text-sm ${getStatusColor(character.status)}`}>
                                {character.status}
                              </span>
                              <button
                                onClick={() => toggleCharacterCollapse(character.id)}
                                className="text-sm parchment-text-light hover:parchment-text"
                                title={collapsedCharacters[character.id] ? 'Expand' : 'Collapse'}
                              >
                                {collapsedCharacters[character.id] ? 'Expand' : 'Collapse'}
                              </button>
                              <button
                                onClick={() => setEditingItem({ type: 'character', id: character.id })}
                                className="text-artificerBlue hover:text-artificerBlue/80 text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteItem('character', character.id)}
                                className="text-sealWax hover:text-sealWax/80 text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                          {!collapsedCharacters[character.id] && (
                            <>
                              <div className="parchment-text-light text-xs flex flex-wrap gap-2 mt-1">
                                {character.race && (<span className="px-2 py-0.5 rounded bg-amber-900/20">Race: {character.race}</span>)}
                                {character.height && (<span className="px-2 py-0.5 rounded bg-amber-900/20">Height: {character.height}</span>)}
                                {character.weight && (<span className="px-2 py-0.5 rounded bg-amber-900/20">Weight: {character.weight}</span>)}
                                {character.gender && (<span className="px-2 py-0.5 rounded bg-amber-900/20">Gender: {character.gender}</span>)}
                                {character.characterClass && (<span className="px-2 py-0.5 rounded bg-amber-900/20">Class: {character.characterClass}</span>)}
                              </div>
                              <p className="parchment-text-light text-sm mb-2" style={{ whiteSpace: 'pre-wrap' }}>{character.description}</p>
                              {character.notes && (
                                <p className="parchment-text-light text-xs italic" style={{ whiteSpace: 'pre-wrap' }}>{character.notes}</p>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Locations Tab */}
            {activeTab === 'locations' && (
              <div className="space-y-4">
                {/* Add New Location */}
                <div className="parchment-card p-4 rounded-lg">
                  <h3 className="parchment-text font-semibold mb-3">Add New Location</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={newLocation.name}
                      onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                      className="parchment-card rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none"
                      placeholder="Location Name"
                    />
                    <select
                      value={newLocation.type}
                      onChange={(e) => setNewLocation({...newLocation, type: e.target.value})}
                      className="parchment-card rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none"
                    >
                      <option value="" className="bg-gray-800 text-white">Select Type</option>
                      <option value="city" className="bg-gray-800 text-white">City</option>
                      <option value="dungeon" className="bg-gray-800 text-white">Dungeon</option>
                      <option value="wilderness" className="bg-gray-800 text-white">Wilderness</option>
                      <option value="shop" className="bg-gray-800 text-white">Shop</option>
                      <option value="tavern" className="bg-gray-800 text-white">Tavern</option>
                      <option value="temple" className="bg-gray-800 text-white">Temple</option>
                      <option value="castle" className="bg-gray-800 text-white">Castle</option>
                      <option value="cave" className="bg-gray-800 text-white">Cave</option>
                    </select>
                  </div>
                  <textarea
                    value={newLocation.description}
                    onChange={(e) => setNewLocation({...newLocation, description: e.target.value})}
                    className="w-full mt-3 h-20 parchment-card rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none resize-none"
                    placeholder="Location description..."
                  />
                  <textarea
                    value={newLocation.notes}
                    onChange={(e) => setNewLocation({...newLocation, notes: e.target.value})}
                    className="w-full mt-3 h-20 parchment-card rounded p-2 parchment-text border border-artificerBronze/30 focus:border-artificerBronze/60 focus:outline-none resize-none"
                    placeholder="Additional notes about this location..."
                  />
                  <button
                    onClick={addLocation}
                    className="mt-3 bg-artificerBronze/80 hover:bg-artificerBronze text-white px-4 py-2 rounded text-sm button-glow"
                  >
                    Add Location
                  </button>
                </div>

                {/* Locations List */}
                <div className="flex items-center justify-end gap-2 mb-2 flex-wrap">
                  <button onClick={collapseAllLocations} className="text-xs px-2 py-1 parchment-card hover:shadow">Collapse All</button>
                  <button onClick={expandAllLocations} className="text-xs px-2 py-1 parchment-card hover:shadow">Expand All</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {locations.map(location => (
                    <div key={location.id} className="parchment-card p-4 rounded-lg border border-artificerBronze/20">
                      {editingItem?.type === 'location' && editingItem?.id === location.id ? (
                        // EDIT MODE
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={location.name}
                            onChange={(e) => updateItemData('location', location.id, { name: e.target.value })}
                            className="w-full parchment-card rounded p-2 parchment-text border border-artificerBronze/30"
                          />
                          <select
                            value={location.type}
                            onChange={(e) => updateItemData('location', location.id, { type: e.target.value })}
                            className="w-full parchment-card parchment-text rounded p-2 border border-artificerBronze/30"
                          >
                            <option value="city" className="bg-gray-800 text-white">City</option>
                            <option value="dungeon" className="bg-gray-800 text-white">Dungeon</option>
                            <option value="wilderness" className="bg-gray-800 text-white">Wilderness</option>
                            <option value="shop" className="bg-gray-800 text-white">Shop</option>
                            <option value="tavern" className="bg-gray-800 text-white">Tavern</option>
                            <option value="temple" className="bg-gray-800 text-white">Temple</option>
                            <option value="castle" className="bg-gray-800 text-white">Castle</option>
                            <option value="cave" className="bg-gray-800 text-white">Cave</option>
                          </select>
                          <textarea
                            value={location.description}
                            onChange={(e) => updateItemData('location', location.id, { description: e.target.value })}
                            className="w-full parchment-card rounded p-2 parchment-text border border-artificerBronze/30 resize-none"
                          />
                          <textarea
                            value={location.notes}
                            onChange={(e) => updateItemData('location', location.id, { notes: e.target.value })}
                            className="w-full parchment-card rounded p-2 parchment-text border border-artificerBronze/30 resize-none"
                          />
                          <button
                            onClick={finishEditing}
                            className="mt-2 bg-artificerBronze/80 px-3 py-1 rounded text-white hover:bg-artificerBronze"
                          >
                            Done
                          </button>
                        </div>
                      ) : (
                        // VIEW MODE
                        <>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="text-xl">{getLocationTypeIcon(location.type)}</span>
                              <div>
                                <h3 className="parchment-text font-semibold">{location.name}</h3>
                                <div className="parchment-text-light text-sm capitalize">{location.type}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap justify-end">
                              <button
                                onClick={() => toggleLocationCollapse(location.id)}
                                className="text-sm parchment-text-light hover:parchment-text"
                                title={collapsedLocations[location.id] ? 'Expand' : 'Collapse'}
                              >
                                {collapsedLocations[location.id] ? 'Expand' : 'Collapse'}
                              </button>
                              <button
                                onClick={() => setEditingItem({ type: 'location', id: location.id })}
                                className="text-artificerBlue hover:text-artificerBlue/80 text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteItem('location', location.id)}
                                className="text-sealWax hover:text-sealWax/80 text-sm"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                          {!collapsedLocations[location.id] && (
                            <>
                              <p className="parchment-text-light text-sm mb-2" style={{ whiteSpace: 'pre-wrap' }}>{location.description}</p>
                              {location.notes && (
                                <p className="parchment-text-light text-xs italic" style={{ whiteSpace: 'pre-wrap' }}>{location.notes}</p>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default EnhancedNotes;