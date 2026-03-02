import { useState, useEffect } from 'react';
import AnimatedContent from '@/components/AnimatedContent';
import ScrollFloat from '@/components/ScrollFloat';
import SpotlightCard from '@/components/SpotlightCard';
import CountUp from '@/components/CountUp';
import { Clock, Code2, Calendar, BarChart3 } from 'lucide-react';

// CONFIGURATION: Replace with your WakaTime API key
const WAKATIME_API_KEY = '';
// If you want to use a proxy/backend endpoint instead, set this:
// const WAKATIME_PROXY_URL = '';

// Fallback data when API key is not set
const fallbackData = {
  totalHours: 0,
  dailyAverage: '0 hrs 0 mins',
  topLanguages: [],
  lastSevenDays: [],
};

export default function WakaTime() {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!WAKATIME_API_KEY) {
      setLoading(false);
      setError('WakaTime API key not configured. Set your API key in src/sections/WakaTime.jsx');
      return;
    }

    const fetchWakaTimeData = async () => {
      try {
        const headers = {
          'Authorization': `Basic ${btoa(WAKATIME_API_KEY)}`,
        };

        // Fetch stats for last 7 days
        const statsRes = await fetch('https://wakatime.com/api/v1/users/current/stats/last_7_days', { headers });
        
        if (!statsRes.ok) throw new Error('Failed to fetch WakaTime data');
        
        const stats = await statsRes.json();
        const statsData = stats.data;

        setData({
          totalHours: Math.round(statsData.total_seconds / 3600),
          dailyAverage: statsData.human_readable_daily_average || '0 hrs',
          topLanguages: (statsData.languages || []).slice(0, 6).map((lang) => ({
            name: lang.name,
            percent: Math.round(lang.percent),
            hours: lang.text,
            color: getLanguageColor(lang.name),
          })),
          lastSevenDays: (statsData.languages || []).slice(0, 5),
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWakaTimeData();
  }, []);

  return (
    <section id="wakatime" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <ScrollFloat>
            <span className="text-4xl md:text-5xl font-bold text-foreground">Coding Activity</span>
          </ScrollFloat>
          <AnimatedContent distance={40} delay={0.2}>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              My coding stats powered by WakaTime
            </p>
          </AnimatedContent>
        </div>

        {error ? (
          <AnimatedContent distance={40}>
            <SpotlightCard className="p-8 rounded-2xl bg-card border border-border text-center max-w-2xl mx-auto" spotlightColor="rgba(59, 130, 246, 0.1)">
              <BarChart3 size={48} className="text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">{error}</p>
              <div className="bg-secondary/50 rounded-lg p-4 text-left">
                <p className="text-sm text-muted-foreground font-mono">
                  {`// Open src/sections/WakaTime.jsx`}<br />
                  {`// Set your API key:`}<br />
                  {`const WAKATIME_API_KEY = 'your-api-key-here';`}
                </p>
              </div>
              <p className="text-xs text-muted-foreground/60 mt-4">
                Get your API key from{' '}
                <a href="https://wakatime.com/settings/api-key" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  wakatime.com/settings/api-key
                </a>
              </p>
            </SpotlightCard>
          </AnimatedContent>
        ) : loading ? (
          <div className="text-center text-muted-foreground">
            <div className="animate-pulse">Loading WakaTime data...</div>
          </div>
        ) : (
          <>
            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              <AnimatedContent distance={40} delay={0}>
                <SpotlightCard className="p-6 rounded-2xl bg-card border border-border text-center" spotlightColor="rgba(59, 130, 246, 0.1)">
                  <Clock size={24} className="text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-1">
                    <CountUp from={0} to={data.totalHours} duration={2} />
                    <span className="text-lg ml-1">hrs</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Last 7 Days</p>
                </SpotlightCard>
              </AnimatedContent>

              <AnimatedContent distance={40} delay={0.1}>
                <SpotlightCard className="p-6 rounded-2xl bg-card border border-border text-center" spotlightColor="rgba(139, 92, 246, 0.1)">
                  <Calendar size={24} className="text-purple-400 mx-auto mb-3" />
                  <div className="text-xl font-bold text-foreground mb-1">
                    {data.dailyAverage}
                  </div>
                  <p className="text-sm text-muted-foreground">Daily Average</p>
                </SpotlightCard>
              </AnimatedContent>

              <AnimatedContent distance={40} delay={0.2}>
                <SpotlightCard className="p-6 rounded-2xl bg-card border border-border text-center col-span-2 md:col-span-1" spotlightColor="rgba(34, 197, 94, 0.1)">
                  <Code2 size={24} className="text-green-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-1">
                    <CountUp from={0} to={data.topLanguages.length} duration={1.5} />
                  </div>
                  <p className="text-sm text-muted-foreground">Languages Used</p>
                </SpotlightCard>
              </AnimatedContent>
            </div>

            {/* Languages Breakdown */}
            {data.topLanguages.length > 0 && (
              <AnimatedContent distance={40} delay={0.3}>
                <SpotlightCard className="p-8 rounded-2xl bg-card border border-border" spotlightColor="rgba(99, 102, 241, 0.1)">
                  <h3 className="text-lg font-semibold text-foreground mb-6">Top Languages</h3>
                  <div className="space-y-4">
                    {data.topLanguages.map((lang, index) => (
                      <div key={lang.name}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-foreground">{lang.name}</span>
                          <span className="text-xs text-muted-foreground">{lang.hours} ({lang.percent}%)</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${lang.percent}%`,
                              backgroundColor: lang.color,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </SpotlightCard>
              </AnimatedContent>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function getLanguageColor(name) {
  const colors = {
    JavaScript: '#f7df1e',
    TypeScript: '#3178c6',
    Python: '#3572a5',
    PHP: '#4F5D95',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Vue: '#42b883',
    React: '#61dafb',
    JSON: '#292929',
    Markdown: '#083fa1',
    SQL: '#e38c00',
    Bash: '#4EAA25',
    SCSS: '#c6538c',
    Blade: '#f7523f',
  };
  return colors[name] || '#6366f1';
}
