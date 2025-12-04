import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/data/StatCard';
import AttendancePieChart from '../../components/charts/AttendancePieChart';
import AttendanceTrendChart from '../../components/charts/AttendanceTrendChart';
import LoadingSpinner from '../../components/feedback/LoadingSpinner';
import EmptyState from '../../components/feedback/EmptyState';
import { fetchDashboardStats } from '../../api/attendance';
import { fetchWeeklyTrend } from '../../api/reports';
import { fetchEvents } from '../../api/events';

const AdminDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

  const statsQuery = useQuery({
    queryKey: ['dashboard-stats', selectedDate],
    queryFn: () => fetchDashboardStats({ date: selectedDate })
  });

  const trendQuery = useQuery({
    queryKey: ['weekly-trend'],
    queryFn: () => fetchWeeklyTrend({ weeks: 6 })
  });

  const eventsQuery = useQuery({
    queryKey: ['events', selectedDate],
    queryFn: () => fetchEvents({ startDate: selectedDate, endDate: selectedDate })
  });

  const departmentChartData = useMemo(() => {
    if (!statsQuery.data?.departmentStats) return [];
    return statsQuery.data.departmentStats.map((dept) => ({
      name: dept._id,
      value: Number(dept.presentValue?.toFixed(2) || 0)
    }));
  }, [statsQuery.data]);

  const trendData = useMemo(() => {
    if (!trendQuery.data) return [];
    return trendQuery.data.map((row) => ({
      label: `Week ${row._id}`,
      presentValue: Number(row.presentValue?.toFixed(2) || 0)
    }));
  }, [trendQuery.data]);

  return (
    <div className="stack gap-lg">
      <PageHeader
        title="Training Overview"
        description="Track attendance health, department performance, and daily events."
        actions={
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        }
      />

      {statsQuery.isLoading ? (
        <LoadingSpinner message="Loading dashboard..." />
      ) : (
        <div className="grid grid-3">
          <StatCard
            title="Total Students"
            value={statsQuery.data?.totalStudents || 0}
            subtitle="Across UG & PG"
          />
          <StatCard
            title="Marked Today"
            value={statsQuery.data?.markedStudents || 0}
            subtitle="Students recorded"
            accent="success"
          />
          <StatCard
            title="Attendance Value"
            value={statsQuery.data?.presentValue || 0}
            subtitle="Full-day equivalent"
            accent="warning"
          />
        </div>
      )}

      <div className="grid grid-2">
        <div>
          <h3>Department Presence</h3>
          {departmentChartData.length ? (
            <AttendancePieChart data={departmentChartData} />
          ) : (
            <EmptyState title="No data" description="Mark attendance to see distribution." />
          )}
        </div>
        <div>
          <h3>Weekly Attendance Trend</h3>
          {trendQuery.isLoading ? (
            <LoadingSpinner message="Fetching trend..." />
          ) : trendData.length ? (
            <AttendanceTrendChart data={trendData} />
          ) : (
            <EmptyState title="No trend data" description="Need multiple weeks of attendance." />
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Daily Training Events</h3>
          <p>Events scheduled for the selected day.</p>
        </div>
        {eventsQuery.isLoading ? (
          <LoadingSpinner message="Loading events..." />
        ) : eventsQuery.data?.length ? (
          <ul className="event-list">
            {eventsQuery.data.map((event) => (
              <li key={event._id}>
                <div>
                  <strong>{event.event_name}</strong>
                  <p>{event.event_description || 'No description provided.'}</p>
                </div>
                <span className={`badge ${event.completed ? 'success' : ''}`}>
                  {event.completed ? 'Completed' : 'Scheduled'}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="No events" description="Add training events from Events tab." />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;


