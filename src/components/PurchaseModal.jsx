
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, DollarSign, User, FileText, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const PurchaseModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    equipmentType: '',
    description: '',
    quantity: '',
    unitPrice: '',
    supplier: '',
    base: '',
    purchasedBy: '',
    notes: ''
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.equipmentType || !formData.description || !formData.quantity || !formData.unitPrice || !formData.supplier || !formData.base || !formData.purchasedBy) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const totalCost = parseFloat(formData.unitPrice) * parseInt(formData.quantity);
    
    onSubmit({
      ...formData,
      quantity: parseInt(formData.quantity),
      unitPrice: parseFloat(formData.unitPrice),
      totalCost
    });

    setFormData({
      equipmentType: '',
      description: '',
      quantity: '',
      unitPrice: '',
      supplier: '',
      base: '',
      purchasedBy: '',
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

  const totalCost = formData.quantity && formData.unitPrice ? 
    (parseFloat(formData.unitPrice) * parseInt(formData.quantity)).toLocaleString() : '0';

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
              <h2 className="text-2xl font-bold text-white">New Purchase Order</h2>
              <p className="text-gray-400">Create a new asset purchase request</p>
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

              {/* Base */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Destination Base *
                </label>
                <select
                  value={formData.base}
                  onChange={(e) => handleChange('base', e.target.value)}
                  className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white focus:border-primary focus:outline-none"
                  required
                >
                  <option value="" className="bg-gray-800">Select base</option>
                  {bases.map(base => (
                    <option key={base} value={base} className="bg-gray-800">{base}</option>
                  ))}
                </select>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              {/* Unit Price */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Unit Price ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.unitPrice}
                  onChange={(e) => handleChange('unitPrice', e.target.value)}
                  placeholder="0.00"
                  min="0"
                  className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                  required
                />
              </div>

              {/* Total Cost */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Total Cost ($)
                </label>
                <div className="w-full bg-black/20 border border-primary/20 rounded-lg px-3 py-2 text-primary font-bold">
                  ${totalCost}
                </div>
              </div>
            </div>

            {/* Supplier */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Supplier *
              </label>
              <input
                type="text"
                value={formData.supplier}
                onChange={(e) => handleChange('supplier', e.target.value)}
                placeholder="e.g., Defense Contractors Inc."
                className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                required
              />
            </div>

            {/* Purchased By */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Purchased By *
              </label>
              <input
                type="text"
                value={formData.purchasedBy}
                onChange={(e) => handleChange('purchasedBy', e.target.value)}
                placeholder="e.g., Lt. Colonel Johnson"
                className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                required
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                placeholder="Additional notes or specifications..."
                rows="3"
                className="w-full bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:border-primary focus:outline-none resize-none"
              />
            </div>

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
                Create Purchase Order
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PurchaseModal;
