import React, { useState, useEffect, useCallback } from 'react';
import Particles from "@tsparticles/react";
import { loadConfettiPreset } from "@tsparticles/preset-confetti";
import { initParticlesEngine } from "@/utils/particles";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import {
  Bell,
  Calendar,
  FileText,
  Mail,
  Plus,
  Settings,
  TrendingUp,
  Users,
  ShoppingCart,
  BarChart,
} from 'lucide-react';
import { tsParticles } from "@tsparticles/engine";

const Dashboard = () => {
  const [init, setInit] = useState(false);

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

  if (!init) {
    return <div>Loading...</div>;
  }

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
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Alex!</h2>
          <p className="text-gray-600">Here's what's happening with your business today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$45,231</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-sm text-green-600 mt-2">+20.1% from last month</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">2,345</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-blue-600 mt-2">+15.3% from last month</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Orders</p>
                <p className="text-2xl font-bold text-gray-900">543</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-purple-600 mt-2">+7.2% from last month</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion</p>
                <p className="text-2xl font-bold text-gray-900">3.24%</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <BarChart className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-orange-600 mt-2">+2.1% from last month</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8 animate-fade-in">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={triggerConfetti}
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200"
            >
              <Plus className="w-6 h-6 text-indigo-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Add Product</span>
            </button>
            <button 
              onClick={triggerConfetti}
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200"
            >
              <Mail className="w-6 h-6 text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Send Campaign</span>
            </button>
            <button 
              onClick={triggerConfetti}
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
            >
              <FileText className="w-6 h-6 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Generate Report</span>
            </button>
            <button 
              onClick={triggerConfetti}
              className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
            >
              <Calendar className="w-6 h-6 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-700">Schedule Meeting</span>
            </button>
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
      </div>
    </div>
  );
};

export default Dashboard;
