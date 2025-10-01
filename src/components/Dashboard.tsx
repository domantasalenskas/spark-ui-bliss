import React, { useState, useEffect, useCallback } from 'react';
import Particles from "@tsparticles/react";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import { initParticlesEngine } from "@/utils/particles";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import * as Icons from 'lucide-react';
import { tsParticles } from "@tsparticles/engine";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDashboardData } from "@/hooks/useDashboardData";
import { AdminPanel } from "@/components/AdminPanel";
import { Toaster } from "@/components/ui/toaster";

const Dashboard = () => {
  const [init, setInit] = useState(false);
  const { settings, stats, actions, loading, refetch } = useDashboardData();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadConfettiPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container?: Container): Promise<void> => {
    console.log(container);
  }, []);

  const triggerConfetti = useCallback(async () => {
    await tsParticles.load({
      id: "confetti-burst", 
      options: {
        preset: "confetti",
        particles: {
          number: { value: 50 },
          color: { value: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"] }
        }
      }
    });
  }, []);

  const confettiOptions: ISourceOptions = {
    preset: "confetti",
    background: {
      color: {
        value: "transparent",
      },
    },
    fullScreen: {
      enable: true,
      zIndex: 1000,
    },
    particles: {
      color: {
        value: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"],
      },
      move: {
        direction: "bottom",
        enable: true,
        outModes: {
          default: "out",
        },
        size: true,
        speed: {
          min: 1,
          max: 3,
        },
      },
      number: {
        value: 50,
        density: {
          enable: true,
          width: 1920,
          height: 1080,
        },
      },
      opacity: {
        value: 1,
        animation: {
          enable: false,
          startValue: "max",
          destroy: "min",
          speed: 0.3,
          sync: true,
        },
      },
      rotate: {
        value: {
          min: 0,
          max: 360,
        },
        direction: "random",
        move: true,
        animation: {
          enable: true,
          speed: 60,
        },
      },
      tilt: {
        direction: "random",
        enable: true,
        move: true,
        value: {
          min: 0,
          max: 360,
        },
        animation: {
          enable: true,
          speed: 60,
        },
      },
      size: {
        value: 3,
        animation: {
          enable: true,
          startValue: "min",
          destroy: "max",
          speed: 40,
          sync: true,
        },
      },
      roll: {
        darken: {
          enable: true,
          value: 25,
        },
        enable: true,
        speed: {
          min: 15,
          max: 25,
        },
      },
      wobble: {
        distance: 30,
        enable: true,
        move: true,
        speed: {
          min: -15,
          max: 15,
        },
      },
    },
  };

  if (!init || loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const getIcon = (iconName: string) => {
    const Icon = Icons[iconName as keyof typeof Icons] as any;
    return Icon || Icons.Circle;
  };

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; hover: string }> = {
      green: { bg: 'bg-green-100', text: 'text-green-600', hover: 'hover:bg-green-50' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', hover: 'hover:bg-blue-50' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:bg-purple-50' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', hover: 'hover:bg-orange-50' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', hover: 'hover:bg-indigo-50 hover:border-indigo-300' },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 bg-grid-pattern">
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={confettiOptions}
        className="absolute inset-0 pointer-events-none"
      />
      
      {/* Header */}
      <div className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">SaaS Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Icons.Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Icons.Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {/* Welcome Section */}
            <div className="mb-8 animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {settings?.welcome_name}!
              </h2>
              <p className="text-gray-600">{settings?.welcome_subtitle}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => {
                const Icon = getIcon(stat.icon);
                const colors = getColorClasses(stat.color);
                return (
                  <div key={stat.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`p-3 ${colors.bg} rounded-lg`}>
                        <Icon className={`w-6 h-6 ${colors.text}`} />
                      </div>
                    </div>
                    <p className={`text-sm ${colors.text} mt-2`}>{stat.change}</p>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8 animate-fade-in">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {actions.map((action) => {
                  const Icon = getIcon(action.icon);
                  const colors = getColorClasses(action.color);
                  return (
                    <button 
                      key={action.id}
                      onClick={triggerConfetti}
                      className={`flex flex-col items-center p-4 rounded-lg border border-gray-200 ${colors.hover} transition-all duration-200`}
                    >
                      <Icon className={`w-6 h-6 ${colors.text} mb-2`} />
                      <span className="text-sm font-medium text-gray-700">{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Action */}
            <div className="text-center">
              <button
                onClick={triggerConfetti}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                🎉 Celebrate!
              </button>
            </div>
          </TabsContent>

          <TabsContent value="admin">
            <AdminPanel 
              settings={settings}
              stats={stats}
              actions={actions}
              onUpdate={refetch}
            />
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </div>
  );
};

export default Dashboard;
