'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useJourneyStore } from '@/lib/store/journeyStore';
import { useAuthStore } from '@/lib/store/authStore';
import { getGreeting } from '@/lib/api/clientApi';
import WeekSelector from '@/components/WeekSelector/WeekSelector';
import JourneyDetails from '@/components/JourneyDetails/JourneyDetails';

export default function JourneyPage() {
  const params = useParams();
  const router = useRouter();
  const weekNumber = Number(params.weekNumber) || 1;

  const { selectedWeek, setSelectedWeek } = useJourneyStore();
  const { isAuthenticated} = useAuthStore();


  const { data: greeting, isLoading } = useQuery({
    queryKey: ['greeting', isAuthenticated],
    queryFn: () => getGreeting(isAuthenticated),
    enabled: isAuthenticated === true, 
    staleTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (greeting && !params.weekNumber) {
      setSelectedWeek(greeting.curWeekToPregnant);
      router.push(`/journey/${greeting.curWeekToPregnant}`);
    } else if (weekNumber) {
      setSelectedWeek(weekNumber);
    }
  }, [greeting, weekNumber, params.weekNumber, router, setSelectedWeek]);

  const handleWeekChange = (week: number) => {
    setSelectedWeek(week);
    router.push(`/journey/${week}`);
  };

  if (isLoading) return <div>Завантаження...</div>;
  if (!isAuthenticated) return <div>⚠️ Будь ласка, увійдіть, щоб побачити сторінку подорожі.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <WeekSelector
        currentWeek={greeting?.curWeekToPregnant || 1}
        selectedWeek={selectedWeek}
        onWeekChange={handleWeekChange}
      />
      <JourneyDetails weekNumber={selectedWeek} />
    </div>
  );
}