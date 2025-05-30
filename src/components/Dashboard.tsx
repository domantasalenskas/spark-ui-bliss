
import React, { useState, useCallback, useMemo } from 'react';
import Particles from '@tsparticles/react';
import { Engine } from '@tsparticles/engine';
import { loadConfettiPreset } from '@tsparticles/preset-confetti';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, DollarSign, Activity, Sparkles, Target, Zap } from 'lucide-react';

const Dashboard = () => {
  const [confettiKey, setConfettiKey] = useState(0);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadConfettiPreset(engine);
  }, []);

  const triggerConfetti = () => {
    setConfettiKey(prev => prev + 1);
  };

  const confettiOptions = useMemo(() => ({
    key: confettiKey,
    preset: "confetti",
    background: {
      color: {
        value: "transparent",
      },
    },
    fullScreen: {
      enable: false,
      zIndex: 1000,
    },
    particles: {
      color: {
        value: ["#667eea", "#764ba2", "#f093fb", "#f5576c", "#4facfe", "#00f2fe"],
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
          area: 800,
        },
      },
      opacity: {
        value: 1,
        animation: {
          enable: true,
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
      shape: {
        type: ["square", "circle"],
      },
      size: {
        value: {
          min: 2,
          max: 4,
        },
      },
      roll: {
        darken: {
          enable: true,
          value: 30,
        },
        enlighten: {
          enable: true,
          value: 30,
        },
        enable: true,
        speed: {
          min: 5,
          max: 15,
        },
      },
      wobble: {
        distance: 30,
        enable: true,
        move: true,
        speed: {
          min: -7,
          max: 7,
        },
      },
    },
  }), [confettiKey]);

  const stats = [
    {
      title: "Total Revenue",
      value: "$124,590",
      change: "+12.5%",
      icon: DollarSign,
      trend: "up",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      title: "Active Users",
      value: "12,453",
      change: "+8.2%",
      icon: Users,
      trend: "up",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Conversion Rate",
      value: "3.24%",
      change: "+2.1%",
      icon: TrendingUp,
      trend: "up",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Performance Score",
      value: "98.2%",
      change: "+5.7%",
      icon: Activity,
      trend: "up",
      color: "from-pink-500 to-pink-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Confetti Container */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <Particles
          id="confetti"
          init={particlesInit}
          options={confettiOptions}
          className="w-full h-full"
        />
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-slate-600 mt-2 text-lg">Welcome back! Here's what's happening with your business.</p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={triggerConfetti}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Celebrate!
              </Button>
              <Button variant="outline" className="border-slate-300 hover:border-slate-400 transition-colors">
                <Target className="w-4 h-4 mr-2" />
                View Reports
              </Button>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={stat.title} 
              className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-0 shadow-md bg-white/80 backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} shadow-lg`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </div>
                <Badge 
                  variant="secondary" 
                  className="bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100 transition-colors"
                >
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Chart Card */}
          <Card className="lg:col-span-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-900">Performance Overview</CardTitle>
              <CardDescription className="text-slate-600">Your business metrics for the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center border border-blue-100">
                <div className="text-center">
                  <Activity className="h-12 w-12 text-blue-400 mx-auto mb-3" />
                  <p className="text-slate-600 font-medium">Chart visualization would go here</p>
                  <p className="text-slate-500 text-sm mt-1">Integration with your preferred charting library</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Card */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-slate-900">Quick Actions</CardTitle>
              <CardDescription className="text-slate-600">Frequently used features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                onClick={triggerConfetti}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Zap className="w-4 h-4 mr-2" />
                Launch Campaign
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300"
              >
                <Users className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-300"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-6 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-slate-900">Recent Activity</CardTitle>
            <CardDescription className="text-slate-600">Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New user registration", time: "2 minutes ago", type: "success" },
                { action: "Payment processed successfully", time: "15 minutes ago", type: "success" },
                { action: "Campaign performance update", time: "1 hour ago", type: "info" },
                { action: "System maintenance scheduled", time: "2 hours ago", type: "warning" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-emerald-400' :
                      activity.type === 'warning' ? 'bg-amber-400' : 'bg-blue-400'
                    }`}></div>
                    <span className="text-slate-900 font-medium">{activity.action}</span>
                  </div>
                  <span className="text-slate-500 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
