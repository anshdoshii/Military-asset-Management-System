
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package, ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NetMovementModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const movements = [
    {
      type: 'Purchases',
      value: data.purchases,
      icon: Package,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      description: 'New assets acquired'
    },
    {
      type: 'Transfer In',
      value: data.transferIn,
      icon: ArrowUp,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      description: 'Assets received from other bases'
    },
    {
      type: 'Transfer Out',
      value: data.transferOut,
      icon: ArrowDown,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
      description: 'Assets sent to other bases'
    }
  ];

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
          className="military-card rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Net Movement Details</h2>
              <p className="text-gray-400">Breakdown of asset movements</p>
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

          <div className="space-y-4 mb-6">
            {movements.map((movement, index) => {
              const Icon = movement.icon;
              return (
                <motion.div
                  key={movement.type}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-black/20 border border-primary/20"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${movement.bgColor}`}>
                      <Icon className={`h-6 w-6 ${movement.color}`} />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{movement.type}</h3>
                      <p className="text-gray-400 text-sm">{movement.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${movement.color}`}>
                      {movement.type === 'Transfer Out' ? '-' : '+'}{movement.value}
                    </p>
                    <p className="text-gray-400 text-sm">units</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="border-t border-primary/30 pt-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/30">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-lg bg-primary/20">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Net Movement</h3>
                  <p className="text-gray-400 text-sm">Total change in assets</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-3xl font-bold ${data.netMovement >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {data.netMovement >= 0 ? '+' : ''}{data.netMovement}
                </p>
                <p className="text-gray-400 text-sm">units</p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Button
              onClick={onClose}
              className="military-button"
            >
              Close Details
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NetMovementModal;
