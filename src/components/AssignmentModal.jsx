
import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Package, MapPin, Shield, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { UserContext } from '@/App';

const AssignmentModal = ({ isOpen, onClose, onSubmit }) => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    equipmentType: '',
    description: '',
    serialNumber: '',
    assignedTo: '',
    unit: '',
    base: user.role === 'base_commander' ? user.base : '',
    assignedBy: user.name,
    notes: ''
  });

  const equipmentTypes = [
    'Weapons',
    'Vehicles',
    'Protective Gear',
    'Communication',
    'Medical Supplies',
    'Other'
  ];

  const allBases = [
    'Alpha Base',
    'Bravo Base',
    'Charlie Base',
    'Delta Base',
    'Echo Base'
  ];
  
  const availableBases = user.role === 'admin' ? allBases : [user.base];


  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.equipmentType || !formData.description || !formData.serialNumber || 
        !formData.assignedTo || !formData.unit || !formData.base || !formData.assignedBy) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    onSubmit(formData);

    setFormData({
      equipmentType: '',
      description: '',
      serialNumber: '',
      assignedTo: '',
      unit: '',
      base: user.role === 'base_commander' ? user.base : '',
      assignedBy: user.name,
      notes: ''
    });
    
    onClose();
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="military-card rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">New Asset Assignment</h2>
              <p className="text-gray-400">Assign equipment to personnel</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-primary/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Equipment Type *
                </label>
                <select
                  value={formData.equipmentType}
                  onChange={(e) => handleChange('equipmentType', e.target.value)}
                  className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
                  required
                >
                  <option value="" className="bg-gray-800">Select equipment type</option>
                  {equipmentTypes.map(type => (
                    <option key={type} value={type} className="bg-gray-800">{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Base Location *
                </label>
                <select
                  value={formData.base}
                  onChange={(e) => handleChange('base', e.target.value)}
                  className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
                  required
                  disabled={user.role === 'base_commander'}
                >
                  <option value="" className="bg-gray-800">Select base</option>
                  {availableBases.map(base => (
                    <option key={base} value={base} className="bg-gray-800">{base}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Equipment Description *
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="e.g., M4A1 Carbine Rifle"
                className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Serial Number *
              </label>
              <input
                type="text"
                value={formData.serialNumber}
                onChange={(e) => handleChange('serialNumber', e.target.value)}
                placeholder="e.g., M4-2024-001"
                className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Assigned To *
                </label>
                <input
                  type="text"
                  value={formData.assignedTo}
                  onChange={(e) => handleChange('assignedTo', e.target.value)}
                  placeholder="e.g., Sergeant John Smith"
                  className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Unit *
                </label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => handleChange('unit', e.target.value)}
                  placeholder="e.g., 1st Infantry Squad"
                  className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Assigned By *
              </label>
              <input
                type="text"
                value={formData.assignedBy}
                onChange={(e) => handleChange('assignedBy', e.target.value)}
                placeholder="e.g., Lt. Colonel Johnson"
                className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                required
                disabled 
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Assignment Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Additional notes about the assignment..."
                rows="3"
                className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-primary focus:outline-none resize-none"
              />
            </div>

            {formData.assignedTo && formData.description && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary/10 border border-primary/30 rounded-lg p-4"
              >
                <h4 className="text-white font-medium mb-2">Assignment Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-primary" />
                    <span className="text-white">{formData.description}</span>
                    {formData.serialNumber && (
                      <span className="text-gray-400">({formData.serialNumber})</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-green-400" />
                    <span className="text-white">{formData.assignedTo}</span>
                    {formData.unit && (
                      <span className="text-gray-400">- {formData.unit}</span>
                    )}
                  </div>
                  {formData.base && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-blue-400" />
                      <span className="text-white">{formData.base}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-primary/50 text-primary hover:bg-primary/20"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="military-button"
              >
                Create Assignment
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AssignmentModal;
