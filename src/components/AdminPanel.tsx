import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { DashboardSettings, DashboardStat, DashboardAction } from '@/hooks/useDashboardData';

interface AdminPanelProps {
  settings: DashboardSettings | null;
  stats: DashboardStat[];
  actions: DashboardAction[];
  onUpdate: () => void;
}

export function AdminPanel({ settings, stats, actions, onUpdate }: AdminPanelProps) {
  const { toast } = useToast();
  const [updating, setUpdating] = useState(false);

  async function updateSettings(data: Partial<DashboardSettings>) {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('dashboard_settings')
        .update(data)
        .eq('id', settings?.id);

      if (error) throw error;

      toast({ title: 'Settings updated successfully' });
      onUpdate();
    } catch (error) {
      toast({ title: 'Error updating settings', variant: 'destructive' });
    } finally {
      setUpdating(false);
    }
  }

  async function updateStat(id: string, data: Partial<DashboardStat>) {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('dashboard_stats')
        .update(data)
        .eq('id', id);

      if (error) throw error;

      toast({ title: 'Stat updated successfully' });
      onUpdate();
    } catch (error) {
      toast({ title: 'Error updating stat', variant: 'destructive' });
    } finally {
      setUpdating(false);
    }
  }

  async function updateAction(id: string, data: Partial<DashboardAction>) {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('dashboard_actions')
        .update(data)
        .eq('id', id);

      if (error) throw error;

      toast({ title: 'Action updated successfully' });
      onUpdate();
    } catch (error) {
      toast({ title: 'Error updating action', variant: 'destructive' });
    } finally {
      setUpdating(false);
    }
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome Section</CardTitle>
          <CardDescription>Update the welcome message</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              defaultValue={settings?.welcome_name}
              onBlur={(e) => updateSettings({ welcome_name: e.target.value })}
              disabled={updating}
            />
          </div>
          <div className="space-y-2">
            <Label>Subtitle</Label>
            <Input
              defaultValue={settings?.welcome_subtitle}
              onBlur={(e) => updateSettings({ welcome_subtitle: e.target.value })}
              disabled={updating}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
          <CardDescription>Update dashboard statistics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {stats.map((stat) => (
            <div key={stat.id} className="border-b pb-4 last:border-0">
              <h4 className="font-medium mb-3">{stat.label}</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Value</Label>
                  <Input
                    defaultValue={stat.value}
                    onBlur={(e) => updateStat(stat.id, { value: e.target.value })}
                    disabled={updating}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Change</Label>
                  <Input
                    defaultValue={stat.change}
                    onBlur={(e) => updateStat(stat.id, { change: e.target.value })}
                    disabled={updating}
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Update action button labels</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {actions.map((action) => (
            <div key={action.id} className="space-y-2">
              <Label>{action.label}</Label>
              <Input
                defaultValue={action.label}
                onBlur={(e) => updateAction(action.id, { label: e.target.value })}
                disabled={updating}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
