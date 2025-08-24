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
  const [newCharacter, setNewCharacter] = useState({ name: '', role: '', description: '', notes: '', status: 'alive' });
  const [newLocation, setNewLocation] = useState({ name: '', type: '', description: '', notes: '' });
  const [editingItem, setEditingItem] = useState(null);

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
                <div className="space-y-3">
                  {sessions.map(session => (
                    <div key={session.id} className="parchment-card p-4 rounded-lg border border-artificerBronze/20">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="parchment-text font-semibold">{session.title}</h3>
                          <div className="parchment-text-light text-sm">{session.date}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => deleteItem('session', session.id)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                      <p className="parchment-text-light text-sm">{session.notes}</p>
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
                            <div className="flex items-center space-x-2">
                              <span className={`text-sm ${getStatusColor(character.status)}`}>
                                {character.status}
                              </span>
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
                          <p className="parchment-text-light text-sm mb-2">{character.description}</p>
                          {character.notes && (
                            <p className="parchment-text-light text-xs italic">{character.notes}</p>
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
                            <div className="flex items-center space-x-2">
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
                          <p className="parchment-text-light text-sm mb-2">{location.description}</p>
                          {location.notes && (
                            <p className="parchment-text-light text-xs italic">{location.notes}</p>
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