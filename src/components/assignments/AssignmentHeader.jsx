import React from 'react';
import { Plus, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const AssignmentHeader = ({ activeTab, onShowAssignmentModal, onShowExpenditureModal }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Assignments & Expenditures</h1>
        <p className="text-gray-300">Manage asset assignments to personnel and track expenditures</p>
      </div>
      <div className="flex space-x-3">
        <Button
          variant="outline"
          className="border-primary/50 text-primary hover:bg-primary/20"
          onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
        >
          <Shield className="h-4 w-4 mr-2" />
          Accountability Report
        </Button>
        <Button
          className="military-button"
          onClick={() => activeTab === 'assignments' ? onShowAssignmentModal() : onShowExpenditureModal()}
        >
          <Plus className="h-4 w-4 mr-2" />
          {activeTab === 'assignments' ? 'New Assignment' : 'Record Expenditure'}
        </Button>
      </div>
    </div>
  );
};

export default AssignmentHeader;