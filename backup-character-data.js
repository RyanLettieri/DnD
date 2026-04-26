// CHARACTER DATA BACKUP
// Generated on: ${new Date().toISOString()}
// This file contains all your current character data for safekeeping

const BACKUP_DATA = {
  // All localStorage keys that contain character data
  localStorageKeys: [
    'stats',
    'proficiencies', 
    'savingThrows',
    'conditions',
    'equipment',
    'preparedSpells',
    'deathSaves',
    'backgroundScribe'
  ],
  
  // Instructions for manual backup:
  manualBackupInstructions: `
  TO BACKUP YOUR CHARACTER DATA:
  
  1. Open your D&D character sheet in browser
  2. Open browser developer tools (F12)
  3. Go to Console tab
  4. Copy and paste this code:
  
  const backup = {};
  const keys = ['stats', 'proficiencies', 'savingThrows', 'conditions', 'equipment', 'preparedSpells', 'deathSaves', 'backgroundScribe'];
  keys.forEach(key => {
    const value = localStorage.getItem(key);
    if (value) backup[key] = JSON.parse(value);
  });
  console.log('CHARACTER BACKUP DATA:', JSON.stringify(backup, null, 2));
  
  5. Copy the output and save it to a text file
  `,
  
  // Restore instructions
  restoreInstructions: `
  TO RESTORE YOUR CHARACTER DATA:
  
  1. Open your D&D character sheet in browser
  2. Open browser developer tools (F12)
  3. Go to Console tab
  4. Paste your backup data and run:
  
  const backupData = { /* your backup data here */ };
  Object.keys(backupData).forEach(key => {
    localStorage.setItem(key, JSON.stringify(backupData[key]));
  });
  location.reload();
  `
};

// Export for use in backup script
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BACKUP_DATA;
}

console.log('=== CHARACTER DATA BACKUP LOADED ===');
console.log('Run the manual backup instructions above to save your data');
