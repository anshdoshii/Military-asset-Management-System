
import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Users, User, Package, AlertTriangle, Calendar, MapPin, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import FilterBar from '@/components/FilterBar';
import AssignmentModal from '@/components/AssignmentModal';
import ExpenditureModal from '@/components/ExpenditureModal';
import AssignmentList from '@/components/assignments/AssignmentList';
import ExpenditureList from '@/components/assignments/ExpenditureList';
import AssignmentTabs from '@/components/assignments/AssignmentTabs';
import AssignmentHeader from '@/components/assignments/AssignmentHeader';
import AssignmentSearchBar from '@/components/assignments/AssignmentSearchBar';
import { UserContext } from '@/App';

const Assignments = () => {
  const { user } = useContext(UserContext);
  const [filters, setFilters] = useState({
    dateRange: 'last30days',
    base: user.role === 'base_commander' ? user.base.toLowerCase().split(' ')[0] : 'all',
    equipmentType: 'all'
  });
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showExpenditureModal, setShowExpenditureModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('assignments');
  const [assignments, setAssignments] = useState([]);
  const [expenditures, setExpenditures] = useState([]);

  useEffect(() => {
    const savedAssignments = localStorage.getItem('military_assignments');
    if (savedAssignments) {
      setAssignments(JSON.parse(savedAssignments));
    } else {
      const sampleAssignments = [
        {
          id: 1,
          equipmentType: 'Weapons',
          description: 'M4A1 Carbine Rifle',
          serialNumber: 'M4-2024-001',
          assignedTo: 'Sergeant John Smith',
          unit: '1st Infantry Squad',
          base: 'Alpha Base',
          assignmentDate: '2024-06-15',
          status: 'active',
          assignedBy: 'Lt. Colonel Johnson',
          notes: 'Primary weapon assignment'
        },
        {
          id: 2,
          equipmentType: 'Protective Gear',
          description: 'Body Armor Vest',
          serialNumber: 'BA-2024-045',
          assignedTo: 'Corporal Jane Doe',
          unit: '2nd Recon Team',
          base: 'Bravo Base',
          assignmentDate: '2024-06-14',
          status: 'active',
          assignedBy: 'Major Wilson',
          notes: 'Level IIIA protection'
        },
        {
          id: 3,
          equipmentType: 'Communication',
          description: 'Tactical Radio',
          serialNumber: 'TR-2024-089',
          assignedTo: 'Private Mike Johnson',
          unit: '3rd Communications',
          base: 'Charlie Base',
          assignmentDate: '2024-06-13',
          status: 'returned',
          assignedBy: 'Captain Davis',
          notes: 'Field communication device'
        }
      ];
      setAssignments(sampleAssignments);
      localStorage.setItem('military_assignments', JSON.stringify(sampleAssignments));
    }

    const savedExpenditures = localStorage.getItem('military_expenditures');
    if (savedExpenditures) {
      setExpenditures(JSON.parse(savedExpenditures));
    } else {
      const sampleExpenditures = [
        {
          id: 1,
          equipmentType: 'Ammunition',
          description: '5.56mm NATO Rounds',
          quantity: 1000,
          unit: '1st Infantry Squad',
          base: 'Alpha Base',
          expenditureDate: '2024-06-16',
          reason: 'Training Exercise',
          authorizedBy: 'Major Smith',
          notes: 'Live fire training'
        },
        {
          id: 2,
          equipmentType: 'Medical Supplies',
          description: 'Field Bandages',
          quantity: 50,
          unit: 'Medical Corps',
          base: 'Bravo Base',
          expenditureDate: '2024-06-15',
          reason: 'Medical Training',
          authorizedBy: 'Captain Martinez',
          notes: 'First aid training supplies'
        },
        {
          id: 3,
          equipmentType: 'Ammunition',
          description: '9mm Pistol Rounds',
          quantity: 500,
          unit: '2nd Security Team',
          base: 'Delta Base',
          expenditureDate: '2024-06-14',
          reason: 'Qualification Training',
          authorizedBy: 'Lt. Colonel Brown',
          notes: 'Marksmanship qualification'
        }
      ];
      setExpenditures(sampleExpenditures);
      localStorage.setItem('military_expenditures', JSON.stringify(sampleExpenditures));
    }
  }, []);
  
  useEffect(() => {
    if (user.role === 'base_commander') {
      setFilters(prev => ({ ...prev, base: user.base.toLowerCase().split(' ')[0] }));
    } else {
      setFilters(prev => ({ ...prev, base: 'all' }));
    }
  }, [user]);


  const handleAddAssignment = (newAssignment) => {
    const assignment = {
      ...newAssignment,
      id: Date.now(),
      assignmentDate: new Date().toISOString().split('T')[0],
      status: 'active'
    };
    const updatedAssignments = [assignment, ...assignments];
    setAssignments(updatedAssignments);
    localStorage.setItem('military_assignments', JSON.stringify(updatedAssignments));
    toast({
      title: "Assignment Created",
      description: `${newAssignment.description} has been assigned to ${newAssignment.assignedTo}.`
    });
  };

  const handleAddExpenditure = (newExpenditure) => {
    const expenditure = {
      ...newExpenditure,
      id: Date.now(),
      expenditureDate: new Date().toISOString().split('T')[0]
    };
    const updatedExpenditures = [expenditure, ...expenditures];
    setExpenditures(updatedExpenditures);
    localStorage.setItem('military_expenditures', JSON.stringify(updatedExpenditures));
    toast({
      title: "Expenditure Recorded",
      description: `${newExpenditure.quantity} ${newExpenditure.description} has been recorded as expended.`
    });
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.unit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBase = filters.base === 'all' || assignment.base.toLowerCase().replace(' base', '') === filters.base;
    const matchesType = filters.equipmentType === 'all' || assignment.equipmentType.toLowerCase().replace(' ', '') === filters.equipmentType;
    return matchesSearch && matchesBase && matchesType;
  });

  const filteredExpenditures = expenditures.filter(expenditure => {
    const matchesSearch = expenditure.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expenditure.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expenditure.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBase = filters.base === 'all' || expenditure.base.toLowerCase().replace(' base', '') === filters.base;
    const matchesType = filters.equipmentType === 'all' || expenditure.equipmentType.toLowerCase().replace(' ', '') === filters.equipmentType;
    return matchesSearch && matchesBase && matchesType;
  });

  return (
    <div className="space-y-6">
      <AssignmentHeader
        activeTab={activeTab}
        onShowAssignmentModal={() => setShowAssignmentModal(true)}
        onShowExpenditureModal={() => setShowExpenditureModal(true)}
      />

      <AssignmentTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filteredAssignmentsCount={filteredAssignments.length}
        filteredExpendituresCount={filteredExpenditures.length}
      />

      <div className="space-y-4">
        <FilterBar filters={filters} setFilters={setFilters} />
        <AssignmentSearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeTab={activeTab}
          filteredAssignments={filteredAssignments}
          filteredExpenditures={filteredExpenditures}
        />
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'assignments' ? (
          <AssignmentList assignments={filteredAssignments} />
        ) : (
          <ExpenditureList expenditures={filteredExpenditures} />
        )}
      </AnimatePresence>

      <AssignmentModal
        isOpen={showAssignmentModal}
        onClose={() => setShowAssignmentModal(false)}
        onSubmit={handleAddAssignment}
      />
      <ExpenditureModal
        isOpen={showExpenditureModal}
        onClose={() => setShowExpenditureModal(false)}
        onSubmit={handleAddExpenditure}
      />
    </div>
  );
};

export default Assignments;
