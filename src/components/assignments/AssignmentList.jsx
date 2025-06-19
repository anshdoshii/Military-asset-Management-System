import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const getStatusColor = (status) => {
  switch (status) {
    case 'active': return 'status-active';
    case 'returned': return 'status-completed';
    case 'maintenance': return 'status-pending';
    default: return 'status-pending';
  }
};

const AssignmentItem = ({ assignment, index }) => (
  <motion.div
    key={assignment.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="military-card rounded-xl p-6 hover:border-primary/50 transition-all duration-200"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-2">
          <h3 className="text-lg font-bold text-white">{assignment.description}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
            {assignment.status}
          </span>
        </div>
        <p className="text-gray-400 text-sm">{assignment.equipmentType} • Serial: {assignment.serialNumber}</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div>
        <p className="text-gray-400 text-sm">Assigned To</p>
        <p className="text-white font-medium flex items-center">
          <User className="h-4 w-4 mr-2" />
          {assignment.assignedTo}
        </p>
        <p className="text-gray-400 text-sm">{assignment.unit}</p>
      </div>
      <div>
        <p className="text-gray-400 text-sm">Base Location</p>
        <p className="text-white flex items-center">
          <MapPin className="h-4 w-4 mr-2" />
          {assignment.base}
        </p>
      </div>
      <div>
        <p className="text-gray-400 text-sm">Assignment Date</p>
        <p className="text-white flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          {assignment.assignmentDate}
        </p>
      </div>
    </div>

    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-400 text-sm">Assigned By: {assignment.assignedBy}</p>
        {assignment.notes && (
          <p className="text-gray-300 text-sm mt-1">{assignment.notes}</p>
        )}
      </div>
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:bg-primary/20"
          onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
        >
          Update Status
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:bg-primary/20"
          onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
        >
          View Details
        </Button>
      </div>
    </div>
  </motion.div>
);

const AssignmentList = ({ assignments }) => {
  if (assignments.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-white mb-2">No assignments found</h3>
        <p className="text-gray-400">Try adjusting your filters or search terms</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="assignments"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-4"
    >
      {assignments.map((assignment, index) => (
        <AssignmentItem key={assignment.id} assignment={assignment} index={index} />
      ))}
    </motion.div>
  );
};

export default AssignmentList;