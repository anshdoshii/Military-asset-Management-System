
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRightLeft, MapPin, Package, User, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const TransferModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    equipmentType: '',
    description: '',
    quantity: '',
    fromBase: '',
    toBase: '',
    requestedBy: '',
    estimatedArrival: '',
    notes: '',
    priority: 'normal'
  });

  const equipmentTypes = [
    'Weapons',
    'Vehicles',
    'Ammunition',
    'Protective Gear',
    'Communication',
    'Medical Supplies',
    'Other'
  ];

  const bases = [
    'Alpha Base',
    'Bravo Base',
    'Charlie Base',
    'Delta Base',
    'Echo Base'
  ];

  const priorities = [
    { value: 'low', label: 'Low Priority' },
    { value: 'normal', label: 'Normal Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.equipmentType || !formData.description || !formData.quantity || 
        !formData.fromBase || !formData.toBase || !formData.requestedBy || !formData.estimatedArrival) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (formData.fromBase === formData.toBase) {
      toast({
        title: "Invalid Transfer",
        description: "Source and destination bases cannot be the same.",
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
      fromBase: '',
      toBase: '',
      requestedBy: '',
      estimatedArrival: '',
      notes: '',
      priority: 'normal'
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

  // Get tomorrow's date as minimum for estimated arrival
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

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
              <h2 className="text-2xl font-bold text-white">New Transfer Request</h2>
              <p className="text-gray-400">Transfer assets between military bases</p>
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
              {/* Equipment Type */}
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

              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Quantity *
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

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Equipment Description *
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                placeholder="e.g., M4A1 Carbine Rifles"
                className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* From Base */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  From Base *
                </label>
                <select
                  value={formData.fromBase}
                  onChange={(e) => handleChange('fromBase', e.target.value)}
                  className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
                  required
                >
                  <option value="" className="bg-gray-800">Select source base</option>
                  {bases.map(base => (
                    <option key={base} value={base} className="bg-gray-800">{base}</option>
                  ))}
                </select>
              </div>

              {/* To Base */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  To Base *
                </label>
                <select
                  value={formData.toBase}
                  onChange={(e) => handleChange('toBase', e.target.value)}
                  className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
                  required
                >
                  <option value="" className="bg-gray-800">Select destination base</option>
                  {bases.filter(base => base !== formData.fromBase).map(base => (
                    <option key={base} value={base} className="bg-gray-800">{base}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Requested By */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Requested By *
                </label>
                <input
                  type="text"
                  value={formData.requestedBy}
                  onChange={(e) => handleChange('requestedBy', e.target.value)}
                  placeholder="e.g., Major Smith"
                  className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                  required
                />
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Priority Level
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                  className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
                >
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value} className="bg-gray-800">
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Estimated Arrival */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Estimated Arrival Date *
              </label>
              <input
                type="date"
                value={formData.estimatedArrival}
                onChange={(e) => handleChange('estimatedArrival', e.target.value)}
                min={minDate}
                className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
                required
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Transfer Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Additional notes, special handling instructions, or justification..."
                rows="3"
                className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-primary focus:outline-none resize-none"
              />
            </div>

            {/* Transfer Preview */}
            {formData.fromBase && formData.toBase && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary/10 border border-primary/30 rounded-lg p-4"
              >
                <h4 className="text-white font-medium mb-2">Transfer Summary</h4>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    <span className="text-white">{formData.fromBase}</span>
                  </div>
                  <ArrowRightLeft className="h-4 w-4 text-primary" />
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-green-400" />
                    <span className="text-white">{formData.toBase}</span>
                  </div>
                </div>
                {formData.description && formData.quantity && (
                  <p className="text-gray-300 text-sm mt-2">
                    {formData.quantity} × {formData.description}
                  </p>
                )}
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
                Submit Transfer Request
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TransferModal;
