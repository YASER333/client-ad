import { useCallback, useMemo, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useMutation, useQuery } from '@tanstack/react-query';
import PageHeader from '../../components/common/PageHeader';
import LoadingSpinner from '../../components/feedback/LoadingSpinner';
import DataTable from '../../components/data/DataTable';
import FileUpload from '../../components/forms/FileUpload';
import { fetchStudents } from '../../api/students';
import { bulkAttendanceImport, markAttendance } from '../../api/attendance';

const AttendanceManager = () => {
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [department, setDepartment] = useState('');
  const [search, setSearch] = useState('');
  const [rowsState, setRowsState] = useState({});
  // Single training event label shared by all students
  const [trainingEvent, setTrainingEvent] = useState('');

  const studentsQuery = useQuery({
    queryKey: ['students-attendance', { department, search }],
    queryFn: () => fetchStudents({ department, search }),
    select: (data) => data || []
  });

  // Initialize rowsState when students data loads or changes
  useEffect(() => {
    if (studentsQuery.data && studentsQuery.data.length > 0) {
      const initialState = {};
      studentsQuery.data.forEach(student => {
        initialState[student._id] = {
          am_attendance: false,
          pm_attendance: false,
          remarks: ''
        };
      });
      setRowsState(initialState);
    }
  }, [studentsQuery.data]);

  const attendanceMutation = useMutation({
    mutationFn: markAttendance,
    onSuccess: () => {
      // 🔔 SUCCESS ALERT
      alert("Attendance saved successfully!");
    },
    onError: (error) => {
      // 🔔 ERROR ALERT
      const msg = error.response?.data?.message || "Failed to save attendance";
      alert(msg);
    }
  });

  const importMutation = useMutation({
    mutationFn: bulkAttendanceImport,
    onSuccess: () => studentsQuery.refetch()
  });

  const toggleValue = useCallback((id, field) => {
    setRowsState((prev) => ({
      ...prev,
      [id]: { 
        ...prev[id], 
        [field]: !prev[id]?.[field] 
      }
    }));
  }, []);

  const markAll = useCallback(
    (field, value) => {
      if (!studentsQuery.data || studentsQuery.data.length === 0) return;
      
      const update = {};
      studentsQuery.data.forEach(student => {
        update[student._id] = { 
          ...rowsState[student._id],
          [field]: value 
        };
      });
      setRowsState(update);
    },
    [studentsQuery.data, rowsState]
  );

  // New function to mark both AM and PM for all students
  const markAllBoth = useCallback(
    (amValue, pmValue) => {
      if (!studentsQuery.data || studentsQuery.data.length === 0) return;
      
      const update = {};
      studentsQuery.data.forEach(student => {
        update[student._id] = { 
          ...rowsState[student._id],
          am_attendance: amValue,
          pm_attendance: pmValue
        };
      });
      setRowsState(update);
    },
    [studentsQuery.data, rowsState]
  );

  const onSubmit = () => {
    const visibleIds = new Set((studentsQuery.data || []).map((student) => student._id));
    const records = Object.entries(rowsState)
      .filter(
        ([student_id, record]) =>
          visibleIds.has(student_id) && (record.am_attendance || record.pm_attendance)
      )
      .map(([student_id, record]) => ({
        student_id,
        am_attendance: record.am_attendance,
        pm_attendance: record.pm_attendance,
        training_event: trainingEvent,         //shared event for all
        remarks: record.remarks
      }));

    if (!records.length) {
      alert("Please select at least one attendance entry.");
      return;
    }

    attendanceMutation.mutate({ date, records });
  };

  const columns = useMemo(
    () => [
      { header: 'Name', accessor: 'student_name' },
      { header: 'Roll', accessor: 'roll_number' },
      { header: 'Department', accessor: 'department' },
      {
        header: (
          <button className="link" onClick={() => markAll('am_attendance', true)}>
            AM
          </button>
        ),
        key: 'am',
        render: (row) => (
          <input
            type="checkbox"
            checked={rowsState[row._id]?.am_attendance || false}
            onChange={() => toggleValue(row._id, 'am_attendance')}
          />
        )
      },
      {
        header: (
          <button className="link" onClick={() => markAll('pm_attendance', true)}>
            PM
          </button>
        ),
        key: 'pm',
        render: (row) => (
          <input
            type="checkbox"
            checked={rowsState[row._id]?.pm_attendance || false}
            onChange={() => toggleValue(row._id, 'pm_attendance')}
          />
        )
      },
      {
        header: 'Training Event',
        key: 'event',
        render: () => (
          // show the shared training event value per row (read-only) to make it clear it is global
          <input placeholder="Event" value={trainingEvent} disabled />
        )
      }
    ],
    [rowsState, toggleValue, markAll, trainingEvent]
  );

  return (
    <div className="stack gap-lg">
      <PageHeader
        title="Attendance Capture"
        description="Mark AM/PM sessions, log training events, or import daily CSV sheets."
        actions={<input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />}
      />

      <div className="filters">
        <input placeholder="Search student" value={search} onChange={(e) => setSearch(e.target.value)} />
        <input
          placeholder="Training event (applies to all students)"
          value={trainingEvent}
          onChange={(e) => setTrainingEvent(e.target.value)}
        />
        <select value={department} onChange={(e) => setDepartment(e.target.value)}>
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
        
        {/* Updated buttons with better functionality */}
        <button className="btn secondary" onClick={() => markAll('am_attendance', true)}>
          Select All AM
        </button>
        <button className="btn secondary" onClick={() => markAll('pm_attendance', true)}>
          Select All PM
        </button>
        <button className="btn secondary" onClick={() => markAllBoth(true, true)}>
          Select All AM+PM
        </button>
        <button className="btn secondary" onClick={() => markAllBoth(false, false)}>
          Clear All
        </button>
      </div>

      <div className="card">
        {studentsQuery.isLoading ? (
          <LoadingSpinner message="Loading students..." />
        ) : (
          <DataTable columns={columns} data={studentsQuery.data} keyField="_id" />
        )}
      </div>

      <div className="action-row">
        <button className="btn primary" onClick={onSubmit} disabled={attendanceMutation.isLoading}>
          {attendanceMutation.isLoading ? 'Saving...' : 'Save Attendance'}
        </button>
      </div>

      {/* <div className="card">
        <h3>Bulk Attendance Import</h3>
        <p>Upload file with columns: roll number, date, am, pm, training event, remarks.</p>
        <FileUpload label="CSV file" accept=".csv" onChange={(file) => file && importMutation.mutate(file)} />
      </div> */}
    </div>
  );
};

export default AttendanceManager;