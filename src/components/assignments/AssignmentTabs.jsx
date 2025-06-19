import React from 'react';
import { Users, AlertTriangle } from 'lucide-react';

const AssignmentTabs = ({ activeTab, setActiveTab, filteredAssignmentsCount, filteredExpendituresCount }) => {
  return (
    <div className="military-card rounded-xl p-1">
      <div className="flex space-x-1">
        <button
          onClick={() => setActiveTab('assignments')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
            activeTab === 'assignments'
              ? 'bg-primary text-white shadow-lg'
              : 'text-gray-300 hover:bg-primary/20 hover:text-white'
          }`}
        >
          <Users className="h-5 w-5" />
          <span className="font-medium">Assignments</span>
          <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
            {filteredAssignmentsCount}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('expenditures')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
            activeTab === 'expenditures'
              ? 'bg-primary text-white shadow-lg'
              : 'text-gray-300 hover:bg-primary/20 hover:text-white'
          }`}
        >
          <AlertTriangle className="h-5 w-5" />
          <span className="font-medium">Expenditures</span>
          <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
            {filteredExpendituresCount}
          </span>
        </button>
      </div>
    </div>
  );
};

export default AssignmentTabs;