
import React, { useState, useEffect, createContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, BarChart3, Package, ArrowRightLeft, Users, Settings, Bell, LogOut, UserCircle, ChevronDown, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import Dashboard from '@/components/Dashboard';
import Purchases from '@/components/Purchases';
import Transfers from '@/components/Transfers';
import Assignments from '@/components/Assignments.jsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";
import { supabase } from '@/lib/supabaseClient.js';


export const UserContext = createContext(null);

const ROLES = {
  ADMIN: 'admin',
  BASE_COMMANDER: 'base_commander',
  LOGISTICS_OFFICER: 'logistics_officer',
};

const USER_PROFILES = {
  [ROLES.ADMIN]: { name: 'Admin Alpha', role: ROLES.ADMIN, base: 'All Bases', permissions: ['dashboard', 'purchases', 'transfers', 'assignments', 'settings'] },
  [ROLES.BASE_COMMANDER]: { name: 'Commander Bravo', role: ROLES.BASE_COMMANDER, base: 'Bravo Base', permissions: ['dashboard', 'assignments'] },
  [ROLES.LOGISTICS_OFFICER]: { name: 'Logistics Charlie', role: ROLES.LOGISTICS_OFFICER, base: 'Charlie Base', permissions: ['dashboard', 'purchases', 'transfers'] },
};

function App() {
  const [currentUserRole, setCurrentUserRole] = useState(ROLES.ADMIN);
  const [user, setUser] = useState(USER_PROFILES[ROLES.ADMIN]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [supabaseConnected, setSupabaseConnected] = useState(false);

  useEffect(() => {
    setUser(USER_PROFILES[currentUserRole]);
    if (!USER_PROFILES[currentUserRole].permissions.includes(activeTab)) {
      setActiveTab('dashboard');
    }
    toast({
      title: "User Role Changed",
      description: `Switched to ${USER_PROFILES[currentUserRole].name} (${USER_PROFILES[currentUserRole].role.replace('_', ' ')})`,
    });
  }, [currentUserRole]);

  useEffect(() => {
    const checkSupabaseConnection = async () => {
      try {
        const { error } = await supabase.from('health_check_table_does_not_exist').select('*').limit(0);

        if (error && error.message.includes('relation "public.health_check_table_does_not_exist" does not exist')) {
          console.log("Supabase connected successfully (test query confirmed connection).");
          toast({
            title: "Supabase Connected",
            description: "Successfully connected to the database.",
          });
          setSupabaseConnected(true);
        } else if (error) {
          console.error("Supabase connection error:", error);
          toast({
            title: "Supabase Connection Failed",
            description: `Could not connect: ${error.message || 'Unknown error'}`,
            variant: "destructive",
          });
          setSupabaseConnected(false);
        } else {
          // This case should ideally not be hit if the table truly doesn't exist,
          // but if it does, it also means we are connected.
          console.log("Supabase connected successfully (test query returned no error).");
           toast({
            title: "Supabase Connected",
            description: "Successfully connected to the database.",
          });
          setSupabaseConnected(true);
        }
      } catch (e) {
        console.error("Supabase client error during connection check:", e);
        toast({
          title: "Supabase Client Error",
          description: "An unexpected error occurred while checking Supabase connection.",
          variant: "destructive",
        });
        setSupabaseConnected(false);
      }
    };

    checkSupabaseConnection();
  }, []);


  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: BarChart3, roles: [ROLES.ADMIN, ROLES.BASE_COMMANDER, ROLES.LOGISTICS_OFFICER] },
    { id: 'purchases', name: 'Purchases', icon: Package, roles: [ROLES.ADMIN, ROLES.LOGISTICS_OFFICER] },
    { id: 'transfers', name: 'Transfers', icon: ArrowRightLeft, roles: [ROLES.ADMIN, ROLES.LOGISTICS_OFFICER] },
    { id: 'assignments', name: 'Assignments', icon: Users, roles: [ROLES.ADMIN, ROLES.BASE_COMMANDER] },
  ];

  const permittedNavigation = navigation.filter(item => user.permissions.includes(item.id));

  const renderContent = () => {
    if (!user.permissions.includes(activeTab)) {
      return (
        <div className="text-center py-12">
          <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-300">You do not have permission to view this section.</p>
        </div>
      );
    }
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'purchases':
        return <Purchases />;
      case 'transfers':
        return <Transfers />;
      case 'assignments':
        return <Assignments />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <UserContext.Provider value={{ user, setUserRole: setCurrentUserRole, ROLES, USER_PROFILES, supabaseConnected, supabase }}>
      <div className="min-h-screen military-gradient">
        <Toaster />
        
        <header className="military-nav sticky top-0 z-50">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="p-2 rounded-full bg-primary/20"
                >
                  <Shield className="h-8 w-8 text-primary" />
                </motion.div>
                <div>
                  <h1 className="text-xl font-bold text-white">Military Asset Management</h1>
                  <p className="text-sm text-gray-300">Secure • Efficient • Accountable</p>
                </div>
                 <div className={`flex items-center space-x-1 ml-4 p-1 px-2 rounded-full ${supabaseConnected ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                  <Database className={`h-4 w-4 ${supabaseConnected ? 'text-green-400' : 'text-red-400'}`} />
                  <span className={`text-xs ${supabaseConnected ? 'text-green-300' : 'text-red-300'}`}>
                    {supabaseConnected ? 'DB Connected' : 'DB Disconnected'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-primary/20"
                  onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
                >
                  <Bell className="h-5 w-5" />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 text-white hover:bg-primary/20 px-3">
                      <UserCircle className="h-5 w-5" />
                      <div className="text-left">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-gray-300 capitalize">{user.role.replace('_', ' ')}</p>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 military-card border-primary/30 text-white">
                    <DropdownMenuLabel className="text-gray-300">Switch Role</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-primary/30"/>
                    {Object.values(ROLES).map(roleKey => (
                      <DropdownMenuItem 
                        key={roleKey} 
                        onClick={() => setCurrentUserRole(roleKey)}
                        className={`hover:bg-primary/20 focus:bg-primary/20 ${currentUserRole === roleKey ? 'bg-primary/30' : ''}`}
                      >
                        {USER_PROFILES[roleKey].name} ({USER_PROFILES[roleKey].role.replace('_', ' ')})
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator className="bg-primary/30"/>
                    <DropdownMenuItem 
                      className="hover:bg-primary/20 focus:bg-primary/20"
                      onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="hover:bg-primary/20 focus:bg-primary/20"
                      onClick={() => toast({ title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀" })}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            className="w-64 min-h-[calc(100vh-4rem)] military-card border-r border-primary/30"
          >
            <nav className="p-4 space-y-2">
              {permittedNavigation.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-primary text-white shadow-lg'
                        : 'text-gray-300 hover:bg-primary/20 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </motion.button>
                );
              })}
            </nav>
          </motion.aside>

          <main className="flex-1 p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + user.role} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;