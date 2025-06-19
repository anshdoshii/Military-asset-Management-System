
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, ArrowRightLeft, MapPin, Calendar, Package, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import FilterBar from '@/components/FilterBar';
import TransferModal from '@/components/TransferModal';

const Transfers = () => {
  const [filters, setFilters] = useState({
    dateRange: 'last30days',
    base: 'all',
    equipmentType: 'all'
  });
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    // Load transfers from localStorage
    const savedTransfers = localStorage.getItem('military_transfers');
    if (savedTransfers) {
      setTransfers(JSON.parse(savedTransfers));
    } else {
      // Sample data
      const sampleTransfers = [
        {
          id: 1,
          equipmentType: 'Vehicles',
          description: 'HMMWV Armored Vehicle',
          quantity: 2,
          fromBase: 'Alpha Base',
          toBase: 'Bravo Base',
          transferDate: '2024-06-16',
          status: 'in-transit',
          requestedBy: 'Major Smith',
          approvedBy: 'Colonel Johnson',
          notes: 'Urgent deployment requirement',
          estimatedArrival: '2024-06-18'
        },
        {
          id: 2,
          equipmentType: 'Weapons',
          description: 'M249 Light Machine Guns',
          quantity: 8,
          fromBase: 'Charlie Base',
          toBase: 'Delta Base',
          transferDate: '2024-06-15',
          status: 'completed',
          requestedBy: 'Captain Davis',
          approvedBy: 'Lt. Colonel Wilson',
          notes: 'Training exercise equipment',
          estimatedArrival: '2024-06-16'
        },
        {
          id: 3,
          equipmentType: 'Communication',
          description: 'Tactical Radio Systems',
          quantity: 12,
          fromBase: 'Echo Base',
          toBase: 'Alpha Base',
          transferDate: '2024-06-14',
          status: 'pending',
          requestedBy: 'Lieutenant Brown',
          approvedBy: null,
          notes: 'Replacement for damaged units',
          estimatedArrival: '2024-06-17'
        },
        {
          id: 4,
          equipmentType: 'Protective Gear',
          description: 'Night Vision Goggles',
          quantity: 15,
          fromBase: 'Bravo Base',
          toBase: 'Charlie Base',
          transferDate: '2024-06-13',
          status: 'completed',
          requestedBy: 'Sergeant Major Taylor',
          approvedBy: 'Major Anderson',
          notes: 'Night operations support',
          estimatedArrival: '2024-06-14'
        },
        {
          id: 5,
          equipmentType: 'Medical Supplies',
          description: 'Field Medical Kits',
          quantity: 30,
          fromBase: 'Delta Base',
          toBase: 'Echo Base',
          transferDate: '2024-06-12',
          status: 'completed',
          requestedBy: 'Medic Thompson',
          approvedBy: 'Captain Martinez',
          notes: 'Medical supply replenishment',
          estimatedArrival: '2024-06-13'
        }
      ];
      setTransfers(sampleTransfers);
      localStorage.setItem('military_transfers', JSON.stringify(sampleTransfers));
    }
  }, []);

  const handleAddTransfer = (newTransfer) => {
    const transfer = {
      ...newTransfer,
      id: Date.now(),
      transferDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      approvedBy: null
    };
    
    const updatedTransfers = [transfer, ...transfers];
    setTransfers(updatedTransfers);
    localStorage.setItem('military_transfers', JSON.stringify(updatedTransfers));
    
    toast({
      title: "Transfer Request Created",
      description: `Transfer of ${newTransfer.description} has been submitted for approval.`
    });
  };

  const filteredTransfers = transfers.filter(transfer => {
    const matchesSearch = transfer.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.fromBase.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.toBase.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBase = filters.base === 'all' || 
                       transfer.fromBase.toLowerCase().includes(filters.base) ||
                       transfer.toBase.toLowerCase().includes(filters.base);
    const matchesType = filters.equipmentType === 'all' || 
                       transfer.equipmentType.toLowerCase().includes(filters.equipmentType);
    
    return matchesSearch && matchesBase && matchesType;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'in-transit': return 'status-active';
      case 'pending': return 'status-pending';
      default: return 'status-pending';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Transfer Management</h1>
          <p className="text-gray-300">Manage asset transfers between military bases</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/20"
            onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
          >
            <Package className="h-4 w-4 mr-2" />
            Transfer History
          </Button>
          <Button
            className="military-button"
            onClick={() => setShowTransferModal(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Transfer
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="space-y-4">
        <FilterBar filters={filters} setFilters={setFilters} />
        
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
                placeholder="Search transfers by equipment, source, or destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/30 border border-primary/30 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:outline-none"
              />
            </div>
            <div className="flex space-x-4 text-center">
              <div>
                <p className="text-sm text-gray-400">Total Transfers</p>
                <p className="text-xl font-bold text-primary">{filteredTransfers.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">In Transit</p>
                <p className="text-xl font-bold text-yellow-400">
                  {filteredTransfers.filter(t => t.status === 'in-transit').length}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Transfers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTransfers.map((transfer, index) => (
          <motion.div
            key={transfer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="military-card rounded-xl p-6 hover:border-primary/50 transition-all duration-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-1">{transfer.description}</h3>
                <p className="text-gray-400 text-sm">{transfer.equipmentType} • Qty: {transfer.quantity}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transfer.status)}`}>
                {transfer.status.replace('-', ' ')}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span className="text-white font-medium">{transfer.fromBase}</span>
                </div>
                <ArrowRightLeft className="h-4 w-4 text-primary" />
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-green-400" />
                  <span className="text-white font-medium">{transfer.toBase}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Transfer Date</p>
                  <p className="text-white flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {transfer.transferDate}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Est. Arrival</p>
                  <p className="text-white flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {transfer.estimatedArrival}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Requested By</p>
                  <p className="text-white flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {transfer.requestedBy}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Approved By</p>
                  <p className="text-white flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    {transfer.approvedBy || 'Pending'}
                  </p>
                </div>
              </div>

              {transfer.notes && (
                <div>
                  <p className="text-gray-400 text-sm">Notes</p>
                  <p className="text-white text-sm">{transfer.notes}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:bg-primary/20"
                onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
              >
                Track Status
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
          </motion.div>
        ))}
      </div>

      {filteredTransfers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <ArrowRightLeft className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No transfers found</h3>
          <p className="text-gray-400">Try adjusting your filters or search terms</p>
        </motion.div>
      )}

      {/* Transfer Modal */}
      <TransferModal
        isOpen={showTransferModal}
        onClose={() => setShowTransferModal(false)}
        onSubmit={handleAddTransfer}
      />
    </div>
  );
};

export default Transfers;
