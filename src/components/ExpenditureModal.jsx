
import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Package, Users, MapPin, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { UserContext } from '@/App';

const ExpenditureModal = ({ isOpen, onClose, onSubmit }) => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    equipmentType: '',
    description: '',
    quantity: '',
    unit: '',
    base: user.role === 'base_commander' ? user.base : '',
    reason: '',
    authorizedBy: user.name,
    notes: ''
  });

  const equipmentTypes = [
    'Ammunition',
    'Medical Supplies',
    'Fuel',
    'Food Supplies',
    'Maintenance Parts',
    'Other Consumables'
  ];

  const allBases = [
    'Alpha Base',
    'Bravo Base',
    'Charlie Base',
    'Delta Base',
    'Echo Base'
  ];
  const availableBases = user.role === 'admin' ? allBases : [user.base];


  const expenditureReasons = [
    'Training Exercise',
    'Combat Operations',
    'Maintenance',
    'Medical Treatment',
    'Emergency Use',
    'Routine Operations',
    'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.equipmentType || !formData.description || !formData.quantity || 
        !formData.unit || !formData.base || !formData.reason || !formData.authorizedBy) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    onSubmit({
      ...formData,
      quantity: parseInt(formData.quantity)
    });

    setFormData({
      equipmentType: '',
      description: '',
      quantity: '',
      unit: '',
      base: user.role === 'base_commander' ? user.base : '',
      reason: '',
      authorizedBy: user.name,
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
              <h2 className="text-2xl font-bold text-white">Record Expenditure</h2>
              <p className="text-gray-400">Track consumed or expended assets</p>
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
                  value={formData.equipmentType}onChange={(e) => handleChange('equipmentType', e.target.value)}
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
                  Quantity Expended *
                </label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleChange('quantity', e.target.value)}
                  placeholder="0"
                  min="1"
                  className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                  required
                />
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
                placeholder="e.g., 5.56mm NATO Rounds"
                className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Expenditure Reason *
                </label>
                <select
                  value={formData.reason}
                  onChange={(e) => handleChange('reason', e.target.value)}
                  className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
                  required
                >
                  <option value="" className="bg-gray-800">Select reason</option>
                  {expenditureReasons.map(reason => (
                    <option key={reason} value={reason} className="bg-gray-800">{reason}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Authorized By *
                </label>
                <input
                  type="text"
                  value={formData.authorizedBy}
                  onChange={(e) => handleChange('authorizedBy', e.target.value)}
                  placeholder="e.g., Major Smith"
                  className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                  required
                  disabled
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Additional Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Additional details about the expenditure..."
                rows="3"
                className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-primary focus:outline-none resize-none"
              />
            </div>

            {formData.description && formData.quantity && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/30 rounded-lg p-4"
              >
                <h4 className="text-white font-medium mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-red-400" />
                  Expenditure Summary
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-red-400" />
                    <span className="text-white">{formData.quantity} × {formData.description}</span>
                  </div>
                  {formData.unit && (
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-blue-400" />
                      <span className="text-white">{formData.unit}</span>
                    </div>
                  )}
                  {formData.base && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-green-400" />
                      <span className="text-white">{formData.base}</span>
                    </div>
                  )}
                  {formData.reason && (
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-yellow-400" />
                      <span className="text-white">Reason: {formData.reason}</span>
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
                Record Expenditure
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExpenditureModal;
