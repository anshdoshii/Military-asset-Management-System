
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, Package, Calendar, MapPin, DollarSign, User, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import FilterBar from '@/components/FilterBar';
import PurchaseModal from '@/components/PurchaseModal';

const Purchases = () => {
  const [filters, setFilters] = useState({
    dateRange: 'last30days',
    base: 'all',
    equipmentType: 'all'
  });
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    // Load purchases from localStorage
    const savedPurchases = localStorage.getItem('military_purchases');
    if (savedPurchases) {
      setPurchases(JSON.parse(savedPurchases));
    } else {
      // Sample data
      const samplePurchases = [
        {
          id: 1,
          equipmentType: 'Weapons',
          description: 'M4A1 Carbine Rifles',
          quantity: 25,
          unitPrice: 1200,
          totalCost: 30000,
          supplier: 'Defense Contractors Inc.',
          base: 'Alpha Base',
          purchaseDate: '2024-06-15',
          status: 'completed',
          purchasedBy: 'Lt. Colonel Johnson',
          notes: 'Standard issue rifles for infantry units'
        },
        {
          id: 2,
          equipmentType: 'Vehicles',
          description: 'HMMWV (Humvee)',
          quantity: 3,
          unitPrice: 85000,
          totalCost: 255000,
          supplier: 'Military Vehicles Corp',
          base: 'Bravo Base',
          purchaseDate: '2024-06-14',
          status: 'pending',
          purchasedBy: 'Major Smith',
          notes: 'Armored patrol vehicles'
        },
        {
          id: 3,
          equipmentType: 'Protective Gear',
          description: 'Body Armor Vests',
          quantity: 50,
          unitPrice: 800,
          totalCost: 40000,
          supplier: 'Tactical Gear Solutions',
          base: 'Charlie Base',
          purchaseDate: '2024-06-13',
          status: 'completed',
          purchasedBy: 'Captain Davis',
          notes: 'Level IIIA protection'
        },
        {
          id: 4,
          equipmentType: 'Communication',
          description: 'Tactical Radio Systems',
          quantity: 15,
          unitPrice: 2500,
          totalCost: 37500,
          supplier: 'CommTech Military',
          base: 'Delta Base',
          purchaseDate: '2024-06-12',
          status: 'completed',
          purchasedBy: 'Major Wilson',
          notes: 'Encrypted communication devices'
        },
        {
          id: 5,
          equipmentType: 'Ammunition',
          description: '5.56mm NATO Rounds',
          quantity: 10000,
          unitPrice: 0.75,
          totalCost: 7500,
          supplier: 'Ammo Supply Co.',
          base: 'Echo Base',
          purchaseDate: '2024-06-11',
          status: 'completed',
          purchasedBy: 'Sergeant Major Brown',
          notes: 'Training and operational use'
        }
      ];
      setPurchases(samplePurchases);
      localStorage.setItem('military_purchases', JSON.stringify(samplePurchases));
    }
  }, []);

  const handleAddPurchase = (newPurchase) => {
    const purchase = {
      ...newPurchase,
      id: Date.now(),
      purchaseDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    
    const updatedPurchases = [purchase, ...purchases];
    setPurchases(updatedPurchases);
    localStorage.setItem('military_purchases', JSON.stringify(updatedPurchases));
    
    toast({
      title: "Purchase Order Created",
      description: `${newPurchase.description} purchase order has been submitted for approval.`
    });
  };

  const filteredPurchases = purchases.filter(purchase => {
    const matchesSearch = purchase.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         purchase.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBase = filters.base === 'all' || purchase.base.toLowerCase().includes(filters.base);
    const matchesType = filters.equipmentType === 'all' || purchase.equipmentType.toLowerCase().includes(filters.equipmentType);
    
    return matchesSearch && matchesBase && matchesType;
  });

  const totalPurchaseValue = filteredPurchases.reduce((sum, purchase) => sum + purchase.totalCost, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Purchase Management</h1>
          <p className="text-gray-300">Track and manage asset purchases across all bases</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/20"
            onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
          >
            <FileText className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button
            className="military-button"
            onClick={() => setShowPurchaseModal(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Purchase
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
                placeholder="Search purchases by description or supplier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/30 border border-primary/30 rounded-lg text-white placeholder-gray-400 focus:border-primary focus:outline-none"
              />
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Total Value</p>
              <p className="text-xl font-bold text-primary">${totalPurchaseValue.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Purchases Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="military-table rounded-xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary/20">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">Equipment</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">Quantity</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">Unit Price</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">Total Cost</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">Supplier</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">Base</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">Date</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/20">
              {filteredPurchases.map((purchase, index) => (
                <motion.tr
                  key={purchase.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-primary/5 transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{purchase.description}</p>
                      <p className="text-gray-400 text-sm">{purchase.equipmentType}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white">{purchase.quantity.toLocaleString()}</td>
                  <td className="px-6 py-4 text-white">${purchase.unitPrice.toLocaleString()}</td>
                  <td className="px-6 py-4 text-white font-medium">${purchase.totalCost.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-300">{purchase.supplier}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-300">
                      <MapPin className="h-3 w-3 mr-1" />
                      {purchase.base}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{purchase.purchaseDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      purchase.status === 'completed' ? 'status-completed' : 
                      purchase.status === 'pending' ? 'status-pending' : 'status-active'
                    }`}>
                      {purchase.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:bg-primary/20"
                      onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
                    >
                      View Details
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {filteredPurchases.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No purchases found</h3>
          <p className="text-gray-400">Try adjusting your filters or search terms</p>
        </motion.div>
      )}

      {/* Purchase Modal */}
      <PurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        onSubmit={handleAddPurchase}
      />
    </div>
  );
};

export default Purchases;
