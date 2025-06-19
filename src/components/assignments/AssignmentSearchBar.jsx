import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const AssignmentSearchBar = ({ searchTerm, setSearchTerm, activeTab, filteredAssignments, filteredExpenditures }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="military-card rounded-xl p-4"
    >
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/30 border border-primary/30 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:outline-none"
          />
        </div>
        <div className="flex space-x-4 text-center">
          {activeTab === 'assignments' ? (
            <>
              <div>
                <p className="text-sm text-gray-400">Active</p>
                <p className="text-xl font-bold text-green-400">
                  {filteredAssignments.filter(a => a.status === 'active').length}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Returned</p>
                <p className="text-xl font-bold text-blue-400">
                  {filteredAssignments.filter(a => a.status === 'returned').length}
                </p>
              </div>
            </>
          ) : (
            <div>
              <p className="text-sm text-gray-400">Total Items</p>
              <p className="text-xl font-bold text-primary">
                {filteredExpenditures.reduce((sum, exp) => sum + exp.quantity, 0)}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AssignmentSearchBar;