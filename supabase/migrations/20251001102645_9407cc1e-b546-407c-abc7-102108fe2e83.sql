-- Create dashboard_settings table
CREATE TABLE public.dashboard_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  welcome_name TEXT NOT NULL DEFAULT 'Welcome Back',
  welcome_subtitle TEXT NOT NULL DEFAULT 'Here''s what''s happening with your projects today',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create dashboard_stats table
CREATE TABLE public.dashboard_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  change TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create dashboard_actions table
CREATE TABLE public.dashboard_actions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.dashboard_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_actions ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (you may want to add authentication later)
CREATE POLICY "Allow public read access to dashboard_settings"
  ON public.dashboard_settings FOR SELECT
  USING (true);

CREATE POLICY "Allow public write access to dashboard_settings"
  ON public.dashboard_settings FOR ALL
  USING (true);

CREATE POLICY "Allow public read access to dashboard_stats"
  ON public.dashboard_stats FOR SELECT
  USING (true);

CREATE POLICY "Allow public write access to dashboard_stats"
  ON public.dashboard_stats FOR ALL
  USING (true);

CREATE POLICY "Allow public read access to dashboard_actions"
  ON public.dashboard_actions FOR SELECT
  USING (true);

CREATE POLICY "Allow public write access to dashboard_actions"
  ON public.dashboard_actions FOR ALL
  USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_dashboard_settings_updated_at
  BEFORE UPDATE ON public.dashboard_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_dashboard_stats_updated_at
  BEFORE UPDATE ON public.dashboard_stats
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_dashboard_actions_updated_at
  BEFORE UPDATE ON public.dashboard_actions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default settings
INSERT INTO public.dashboard_settings (welcome_name, welcome_subtitle)
VALUES ('Welcome Back', 'Here''s what''s happening with your projects today');

-- Insert default stats
INSERT INTO public.dashboard_stats (label, value, change, icon, color, sort_order)
VALUES
  ('Total Revenue', '$45,231.89', '+20.1% from last month', 'DollarSign', 'blue', 1),
  ('Subscriptions', '+2,350', '+180.1% from last month', 'Users', 'green', 2),
  ('Sales', '+12,234', '+19% from last month', 'CreditCard', 'purple', 3),
  ('Active Now', '+573', '+201 since last hour', 'Activity', 'orange', 4);

-- Insert default actions
INSERT INTO public.dashboard_actions (label, icon, color, sort_order)
VALUES
  ('Create Report', 'FileText', 'blue', 1),
  ('New Customer', 'UserPlus', 'green', 2),
  ('Send Invoice', 'Send', 'purple', 3),
  ('View Analytics', 'BarChart3', 'orange', 4);