import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface DashboardSettings {
  id: string;
  welcome_name: string;
  welcome_subtitle: string;
}

export interface DashboardStat {
  id: string;
  label: string;
  value: string;
  change: string;
  icon: string;
  color: string;
  sort_order: number;
}

export interface DashboardAction {
  id: string;
  label: string;
  icon: string;
  color: string;
  sort_order: number;
}

export function useDashboardData() {
  const [settings, setSettings] = useState<DashboardSettings | null>(null);
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [actions, setActions] = useState<DashboardAction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [settingsRes, statsRes, actionsRes] = await Promise.all([
        supabase.from('dashboard_settings').select('*').limit(1).single(),
        supabase.from('dashboard_stats').select('*').order('sort_order'),
        supabase.from('dashboard_actions').select('*').order('sort_order'),
      ]);

      if (settingsRes.data) setSettings(settingsRes.data);
      if (statsRes.data) setStats(statsRes.data);
      if (actionsRes.data) setActions(actionsRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  return { settings, stats, actions, loading, refetch: fetchData };
}
