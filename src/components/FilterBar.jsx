
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Filter, Calendar, MapPin, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { UserContext } from '@/App';

const FilterBar = ({ filters, setFilters }) => {
  const { user } = useContext(UserContext);

  const dateRanges = [
    { value: 'today', label: 'Today' },
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last90days', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const allBases = [
    { value: 'all', label: 'All Bases' },
    { value: 'alpha', label: 'Alpha Base' },
    { value: 'bravo', label: 'Bravo Base' },
    { value: 'charlie', label: 'Charlie Base' },
    { value: 'delta', label: 'Delta Base' },
    { value: 'echo', label: 'Echo Base' }
  ];

  const availableBases = user.role === 'admin' || user.role === 'logistics_officer'
    ? allBases
    : allBases.filter(b => b.value === 'all' || b.label === user.base);


  const equipmentTypes = [
    { value: 'all', label: 'All Equipment' },
    { value: 'weapons', label: 'Weapons' },
    { value: 'vehicles', label: 'Vehicles' },
    { value: 'ammunition', label: 'Ammunition' },
    { value: 'protectivegear', label: 'Protective Gear' },
    { value: 'communication', label: 'Communication' },
    { value: 'medicalsupplies', label: 'Medical Supplies' }
  ];

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    toast({ title: `Filter updated: ${filterType} set to ${value}` });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="military-card rounded-xl p-4"
    >
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-primary" />
          <span className="text-white font-medium">Filters:</span>
        </div>

        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          <select
            value={filters.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
          >
            {dateRanges.map(range => (
              <option key={range.value} value={range.value} className="bg-gray-800">
                {range.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <select
            value={filters.base}
            onChange={(e) => handleFilterChange('base', e.target.value)}
            className="bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
            disabled={user.role === 'base_commander' && filters.base !== 'all'}
          >
            {availableBases.map(base => (
              <option key={base.value} value={base.value} className="bg-gray-800">
                {base.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <Package className="h-4 w-4 text-gray-400" />
          <select
            value={filters.equipmentType}
            onChange={(e) => handleFilterChange('equipmentType', e.target.value)}
            className="bg-black/30 border border-primary/30 rounded-lg px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
          >
            {equipmentTypes.map(type => (
              <option key={type.value} value={type.value} className="bg-gray-800">
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="border-primary/50 text-primary hover:bg-primary/20"
          onClick={() => {
            const defaultBase = user.role === 'base_commander' ? user.base.toLowerCase().split(' ')[0] : 'all';
            setFilters({ dateRange: 'last30days', base: defaultBase, equipmentType: 'all' });
            toast({ title: "Filters reset to default" });
          }}
        >
          Reset Filters
        </Button>
      </div>
    </motion.div>
  );
};

export default FilterBar;
