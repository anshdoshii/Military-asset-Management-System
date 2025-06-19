
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MetricCard = ({ title, value, icon: Icon, color, bgColor, trend, clickable, onClick }) => {
  const CardComponent = clickable ? motion.button : motion.div;
  
  return (
    <CardComponent
      whileHover={{ scale: clickable ? 1.05 : 1.02 }}
      whileTap={clickable ? { scale: 0.95 } : {}}
      onClick={clickable ? onClick : undefined}
      className={`metric-card rounded-xl p-6 ${clickable ? 'cursor-pointer' : ''}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        {trend && (
          <div className={`flex items-center ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            {trend === 'up' ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-white mb-1">{value.toLocaleString()}</p>
        <p className="text-gray-400 text-sm">{title}</p>
        {clickable && (
          <p className="text-primary text-xs mt-2">Click for details</p>
        )}
      </div>
    </CardComponent>
  );
};

export default MetricCard;
