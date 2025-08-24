import React from 'react';

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="flex space-x-1 p-2 parchment-card rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 font-medium transition-all duration-200 rounded-md ${
              activeTab === tab.id
                ? 'tab-active'
                : 'tab-inactive'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;