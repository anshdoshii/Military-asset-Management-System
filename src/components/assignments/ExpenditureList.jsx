import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const ExpenditureItem = ({ expenditure, index }) => (
  <motion.div
    key={expenditure.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
    className="military-card rounded-xl p-6 hover:border-primary/50 transition-all duration-200"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="flex-1">
        <h3 className="text-lg font-bold text-white mb-1">{expenditure.description}</h3>
        <p className="text-gray-400 text-sm">{expenditure.equipmentType} • Quantity: {expenditure.quantity}</p>
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold text-red-400">-{expenditure.quantity}</p>
        <p className="text-gray-400 text-sm">expended</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div>
        <p className="text-gray-400 text-sm">Unit</p>
        <p className="text-white font-medium flex items-center">
          <Users className="h-4 w-4 mr-2" />
          {expenditure.unit}
        </p>
      </div>
      <div>
        <p className="text-gray-400 text-sm">Base Location</p>
        <p className="text-white flex items-center">
          <MapPin className="h-4 w-4 mr-2" />
          {expenditure.base}
        </p>
      </div>
      <div>
        <p className="text-gray-400 text-sm">Expenditure Date</p>
        <p className="text-white flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          {expenditure.expenditureDate}
        </p>
      </div>
    </div>

    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-400 text-sm">Reason: {expenditure.reason}</p>
        <p className="text-gray-400 text-sm">Authorized By: {expenditure.authorizedBy}</p>
        {expenditure.notes && (
          <p className="text-gray-300 text-sm mt-1">{expenditure.notes}</p>
        )}
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="text-primary hover:bg-primary/20"
        onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
      >
        View Details
      </Button>
    </div>
  </motion.div>
);

const ExpenditureList = ({ expenditures }) => {
  if (expenditures.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-medium text-white mb-2">No expenditures found</h3>
        <p className="text-gray-400">Try adjusting your filters or search terms</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      key="expenditures"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      {expenditures.map((expenditure, index) => (
        <ExpenditureItem key={expenditure.id} expenditure={expenditure} index={index} />
      ))}
    </motion.div>
  );
};

export default ExpenditureList;