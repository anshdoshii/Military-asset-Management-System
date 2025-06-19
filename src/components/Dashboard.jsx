
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, TrendingDown, Activity, Package, ArrowRightLeft, Users, AlertTriangle, Filter, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import MetricCard from '@/components/MetricCard';
import FilterBar from '@/components/FilterBar';
import NetMovementModal from '@/components/NetMovementModal';

const Dashboard = () => {
  const [filters, setFilters] = useState({
    dateRange: 'last30days',
    base: 'all',
    equipmentType: 'all'
  });
  const [showNetMovementModal, setShowNetMovementModal] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    openingBalance: 1250,
    closingBalance: 1180,
    purchases: 85,
    transferIn: 45,
    transferOut: 120,
    assigned: 180,
    expended: 95
  });

  const netMovement = dashboardData.purchases + dashboardData.transferIn - dashboardData.transferOut;

  const metrics = [
    {
      title: 'Opening Balance',
      value: dashboardData.openingBalance,
      icon: Package,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      trend: null
    },
    {
      title: 'Closing Balance',
      value: dashboardData.closingBalance,
      icon: Package,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      trend: dashboardData.closingBalance > dashboardData.openingBalance ? 'up' : 'down'
    },
    {
      title: 'Net Movement',
      value: netMovement,
      icon: Activity,
      color: netMovement >= 0 ? 'text-green-400' : 'text-red-400',
      bgColor: netMovement >= 0 ? 'bg-green-500/20' : 'bg-red-500/20',
      trend: netMovement >= 0 ? 'up' : 'down',
      clickable: true,
      onClick: () => setShowNetMovementModal(true)
    },
    {
      title: 'Assigned',
      value: dashboardData.assigned,
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      trend: 'up'
    },
    {
      title: 'Expended',
      value: dashboardData.expended,
      icon: AlertTriangle,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      trend: 'down'
    }
  ];

  const recentActivities = [
    { id: 1, type: 'Purchase', description: 'M4A1 Rifles (25 units)', base: 'Alpha Base', timestamp: '2 hours ago', status: 'completed' },
    { id: 2, type: 'Transfer', description: 'Humvee Transfer to Bravo Base', base: 'Alpha Base', timestamp: '4 hours ago', status: 'pending' },
    { id: 3, type: 'Assignment', description: 'Body Armor assigned to Squad 3', base: 'Charlie Base', timestamp: '6 hours ago', status: 'completed' },
    { id: 4, type: 'Expenditure', description: '5.56mm Ammunition (1000 rounds)', base: 'Delta Base', timestamp: '8 hours ago', status: 'completed' },
    { id: 5, type: 'Purchase', description: 'Night Vision Goggles (10 units)', base: 'Echo Base', timestamp: '1 day ago', status: 'completed' }
  ];

  const baseStatistics = [
    { name: 'Alpha Base', assets: 450, utilization: 85, status: 'operational' },
    { name: 'Bravo Base', assets: 320, utilization: 72, status: 'operational' },
    { name: 'Charlie Base', assets: 280, utilization: 68, status: 'maintenance' },
    { name: 'Delta Base', assets: 380, utilization: 91, status: 'operational' },
    { name: 'Echo Base', assets: 250, utilization: 64, status: 'operational' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Command Dashboard</h1>
          <p className="text-gray-300">Real-time asset tracking and management overview</p>
        </div>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="border-primary/50 text-primary hover:bg-primary/20"
            onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button
            className="military-button"
            onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Generate Analytics
          </Button>
        </div>
      </div>

      {/* Filters */}
      <FilterBar filters={filters} setFilters={setFilters} />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <MetricCard {...metric} />
          </motion.div>
        ))}
      </div>

      {/* Charts and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="military-card rounded-xl p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Recent Activities</h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:bg-primary/20"
              onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
            >
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-lg bg-black/20 border border-primary/20 hover:border-primary/40 transition-all duration-200"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'completed' ? 'status-completed' : 'status-pending'
                    }`}>
                      {activity.type}
                    </span>
                    <span className="text-gray-400 text-xs">{activity.timestamp}</span>
                  </div>
                  <p className="text-white font-medium">{activity.description}</p>
                  <p className="text-gray-400 text-sm flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {activity.base}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Base Statistics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="military-card rounded-xl p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Base Statistics</h2>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:bg-primary/20"
              onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
            >
              Detailed View
            </Button>
          </div>
          <div className="space-y-4">
            {baseStatistics.map((base, index) => (
              <motion.div
                key={base.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg bg-black/20 border border-primary/20 hover:border-primary/40 transition-all duration-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-white font-medium">{base.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    base.status === 'operational' ? 'status-active' : 'status-pending'
                  }`}>
                    {base.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Assets: {base.assets}</span>
                  <span>Utilization: {base.utilization}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${base.utilization}%` }}
                    transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                    className={`h-2 rounded-full ${
                      base.utilization >= 80 ? 'bg-red-500' : 
                      base.utilization >= 60 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Net Movement Modal */}
      <NetMovementModal
        isOpen={showNetMovementModal}
        onClose={() => setShowNetMovementModal(false)}
        data={{
          purchases: dashboardData.purchases,
          transferIn: dashboardData.transferIn,
          transferOut: dashboardData.transferOut,
          netMovement
        }}
      />
    </div>
  );
};

export default Dashboard;
