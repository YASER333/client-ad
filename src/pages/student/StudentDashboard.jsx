import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';

import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/data/StatCard';
import AttendancePieChart from '../../components/charts/AttendancePieChart';
import DataTable from '../../components/data/DataTable';
import LoadingSpinner from '../../components/feedback/LoadingSpinner';
import DateRangePicker from '../../components/forms/DateRangePicker';

import { fetchMyAttendance, fetchMySummary } from '../../api/attendance';
import useAuth from '../../hooks/useAuth';

const StudentDashboard = () => {
  const { user } = useAuth();

  const [range, setRange] = useState({
    startDate: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
    endDate: dayjs().format('YYYY-MM-DD')
  });

  // SUMMARY QUERY
  const summaryQuery = useQuery({
    queryKey: ['student-summary', range],
    queryFn: () => fetchMySummary(range)
  });

  // HISTORY QUERY
  const historyQuery = useQuery({
    queryKey: ['student-history', range],
    queryFn: () => fetchMyAttendance(range)
  });

  // PIE CHART DATA — must be defined BEFORE use
  const pieData = useMemo(() => {
    const d = summaryQuery.data;
    if (!d) return [];

    return [
      { name: 'Full Days', value: d.fullDays || 0 },
      { name: 'Half Days', value: d.halfDays || 0 },
      { name: 'Absences', value: d.absentDays || 0 }
    ];
  }, [summaryQuery.data]);

  const columns = [
    {
      header: 'Date',
      key: 'date',
      render: (row) => dayjs(row.date).format('DD MMM')
    },
    {
      header: 'AM',
      accessor: 'am_attendance',
      render: (row) => (row.am_attendance ? 'Present' : 'Absent')
    },
    {
      header: 'PM',
      accessor: 'pm_attendance',
      render: (row) => (row.pm_attendance ? 'Present' : 'Absent')
    },
    { header: 'Event', accessor: 'training_event' },
    { header: 'Remarks', accessor: 'remarks' }
  ];

  return (
    <div className="stack gap-lg">
      {/* Student Header */}
      <PageHeader
        title={`Welcome, ${user?.name || 'Student'}`}
        description="Monitor your 30-day training performance and attendance summary."
      />

      {/* SUMMARY CARDS + PIE */}
      {summaryQuery.isLoading ? (
        <LoadingSpinner message="Calculating summary..." />
      ) : (
        <>
          <div className="grid grid-3">
            <StatCard title="Attendance %" value={`${summaryQuery.data?.percentage || 0}%`} />
            <StatCard title="Full Days" value={summaryQuery.data?.fullDays || 0} accent="success" />
            <StatCard title="Half Days" value={summaryQuery.data?.halfDays || 0} accent="warning" />
          </div>

          <AttendancePieChart data={pieData} />
        </>
      )}

      {/* HISTORY TABLE */}
      <div className="card">
        <div className="filters">
          <DateRangePicker value={range} onChange={setRange} />
        </div>

        {historyQuery.isLoading ? (
          <LoadingSpinner message="Loading attendance history..." />
        ) : (
          <DataTable columns={columns} data={historyQuery.data || []} keyField="_id" />
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;

