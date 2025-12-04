import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/data/DataTable';
import LoadingSpinner from '../../components/feedback/LoadingSpinner';
import DateRangePicker from '../../components/forms/DateRangePicker';
import { downloadSummaryCsv, fetchSummaryReport } from '../../api/reports';

const Reports = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    department: '',
    program_type: '',
    minPercentage: '',
    maxPercentage: ''
  });

  const summaryQuery = useQuery({
    queryKey: ['summary-report', filters],
    queryFn: () => fetchSummaryReport(filters)
  });

  const handleDownload = async () => {
    const blob = await downloadSummaryCsv(filters);
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'attendance-summary.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const columns = [
    { header: 'Student', accessor: 'student_name' },
    { header: 'Roll', accessor: 'roll_number' },
    { header: 'Department', accessor: 'department' },
    { header: 'Program', accessor: 'program_type' },
    { header: 'Full Days', accessor: 'fullDays' },
    { header: 'Half Days', accessor: 'halfDays' },
    { header: 'Absent', accessor: 'absentDays' },
    { header: 'Attendance %', accessor: 'percentage' }
  ];

  return (
    <div className="stack gap-lg">
      <PageHeader
        title="Reports & Exports"
        description="Filter by week, department, or attendance range. Download CSV for compliance."
        actions={
          <button className="btn secondary" onClick={handleDownload}>
            Download CSV
          </button>
        }
      />

      <div className="card">
        <div className="filters">
          <DateRangePicker
            value={{ startDate: filters.startDate, endDate: filters.endDate }}
            onChange={(range) => setFilters((prev) => ({ ...prev, ...range }))}
          />
          <select
            value={filters.department}
            onChange={(e) => setFilters((prev) => ({ ...prev, department: e.target.value }))}
          >
            <option value="">All Departments</option>
            <option value="CSE">CSE</option>
            <option value="IT">IT</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="CIVIL">CIVIL</option>
            <option value="MECH">MECH</option>
            <option value="MBA">MBA</option>
            <option value="MCA">MCA</option>
          </select>
          <select
            value={filters.program_type}
            onChange={(e) => setFilters((prev) => ({ ...prev, program_type: e.target.value }))}
          >
            <option value="">All Programs</option>
            <option value="UG">UG</option>
            <option value="PG">PG</option>
          </select>
          <input
            type="number"
            placeholder="Min %"
            value={filters.minPercentage}
            onChange={(e) => setFilters((prev) => ({ ...prev, minPercentage: e.target.value }))}
          />
          <input
            type="number"
            placeholder="Max %"
            value={filters.maxPercentage}
            onChange={(e) => setFilters((prev) => ({ ...prev, maxPercentage: e.target.value }))}
          />
        </div>

        {summaryQuery.isLoading ? (
          <LoadingSpinner message="Generating summary..." />
        ) : (
          <DataTable columns={columns} data={summaryQuery.data || []} keyField="roll_number" />
        )}
      </div>
    </div>
  );
};

export default Reports;


