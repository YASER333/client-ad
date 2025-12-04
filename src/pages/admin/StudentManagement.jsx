import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/data/DataTable';
import LoadingSpinner from '../../components/feedback/LoadingSpinner';
import FileUpload from '../../components/forms/FileUpload';
import {
  createStudent,
  deleteStudent,
  fetchStudents,
  importStudents
} from '../../api/students';

const departments = ['CSE', 'IT', 'ECE', 'EEE', 'CIVIL', 'MECH', 'MBA', 'MCA'];
const programs = ['UG', 'PG'];

const StudentManagement = () => {
  const [filters, setFilters] = useState({ department: '', program_type: '', search: '' });
  const [selectedFile, setSelectedFile] = useState(null); // SAVE FILE IN STATE

  const { register, handleSubmit, reset } = useForm();

  const studentsQuery = useQuery({
    queryKey: ['students', filters],
    queryFn: () => fetchStudents(filters)
  });

  const createMutation = useMutation({
    mutationFn: createStudent,
    onSuccess: () => {
      studentsQuery.refetch();
      reset();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => studentsQuery.refetch()
  });

  const importMutation = useMutation({
    mutationFn: importStudents,
    onSuccess: () => {
      studentsQuery.refetch();
      setSelectedFile(null);
    }
  });

  const onCreate = (values) => createMutation.mutate(values);

  // IMPORT BUTTON HANDLER
  const handleImport = () => {
    if (!selectedFile) {
      alert("Please choose a CSV/Excel file first!");
      return;
    }
    importMutation.mutate(selectedFile);
  };

  const columns = useMemo(
    () => [
      { header: 'Name', accessor: 'student_name' },
      { header: 'Roll Number', accessor: 'roll_number' },
      { header: 'Department', accessor: 'department' },
      { header: 'Program', accessor: 'program_type' },
      {
        header: 'Actions',
        key: 'actions',
        render: (row) => (
          <button
            className="link danger icon"
            onClick={() => deleteMutation.mutate(row._id)}
            title="Delete student"
            aria-label={`Delete ${row.student_name}`}
          >
            {/* Trash SVG icon (small) */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
              <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )
      }
    ],
    [deleteMutation]
  );

  return (
    <div className="stack gap-lg">
      <PageHeader
        title="Student Directory"
        description="Manage trainee roster, quickly import CSV/Excel data, and keep credentials synced."
      />

      {/* ADD STUDENT */}
      <div className="card">
        <h3>Add Student</h3>
        <form className="grid grid-4" onSubmit={handleSubmit(onCreate)}>
          <label>
            Name
            <input {...register('student_name', { required: true })} />
          </label>
          <label>
            Roll Number
            <input {...register('roll_number', { required: true })} />
          </label>
          <label>
            Department
            <select {...register('department', { required: true })}>
              <option value="">Choose</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </label>
          <label>
            Program
            <select {...register('program_type', { required: true })}>
              <option value="">Choose</option>
              {programs.map((program) => (
                <option key={program} value={program}>
                  {program}
                </option>
              ))}
            </select>
          </label>
          <button type="submit" className="btn primary" disabled={createMutation.isLoading}>
            {createMutation.isLoading ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>

      {/* IMPORT SECTION */}
      <div className="card">
        <div className="card-header">
          <h3>Bulk Import</h3>
          <p>Upload CSV/Excel with required headers.</p>
        </div>

        {/* Choose File */}
        <FileUpload
          label="CSV or Excel file"
          accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={(file) => setSelectedFile(file)} // SAVE FILE ONLY
        />

        {/* Show selected file */}
        {selectedFile && (
          <p style={{ marginTop: "10px" }}>
            Selected File: <b>{selectedFile.name}</b>
          </p>
        )}

        {/* Import button */}
        <button
          className="btn primary"
          onClick={handleImport}
          disabled={importMutation.isLoading}
          style={{ marginTop: "10px" }}
        >
          {importMutation.isLoading ? "Importing..." : "Import"}
        </button>

        {importMutation.isLoading && <p>Importing...</p>}
      </div>

      {/* STUDENT LIST */}
      <div className="card">
        <div className="filters">
          <input
            placeholder="Search name / roll"
            value={filters.search}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
          />
          <select
            value={filters.department}
            onChange={(e) => setFilters((prev) => ({ ...prev, department: e.target.value }))}
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          <select
            value={filters.program_type}
            onChange={(e) => setFilters((prev) => ({ ...prev, program_type: e.target.value }))}
          >
            <option value="">All Programs</option>
            {programs.map((program) => (
              <option key={program} value={program}>
                {program}
              </option>
            ))}
          </select>
        </div>

        {studentsQuery.isLoading ? (
          <LoadingSpinner message="Loading students..." />
        ) : (
          <DataTable wrapperClassName="students-table" columns={columns} data={studentsQuery.data || []} keyField="_id" />
        )}
      </div>
    </div>
  );
};

export default StudentManagement;

