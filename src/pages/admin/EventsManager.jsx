import { useState } from 'react';
import dayjs from 'dayjs';
import { useMutation, useQuery } from '@tanstack/react-query';
import PageHeader from '../../components/common/PageHeader';
import LoadingSpinner from '../../components/feedback/LoadingSpinner';
import {
  createEvent,
  deleteEvent,
  fetchEvents,
  updateEvent
} from '../../api/events';

const EventsManager = () => {
  const [range, setRange] = useState({
    startDate: dayjs().startOf('week').format('YYYY-MM-DD'),
    endDate: dayjs().endOf('week').format('YYYY-MM-DD')
  });
  const [form, setForm] = useState({
    date: dayjs().format('YYYY-MM-DD'),
    event_name: '',
    event_description: ''
  });

  const eventsQuery = useQuery({
    queryKey: ['events', range],
    queryFn: () => fetchEvents(range)
  });

  const createMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      eventsQuery.refetch();
      setForm((prev) => ({ ...prev, event_name: '', event_description: '' }));
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => updateEvent(id, payload),
    onSuccess: () => eventsQuery.refetch()
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => eventsQuery.refetch()
  });

  const onSubmit = (e) => {
    e.preventDefault();
    createMutation.mutate(form);
  };

  return (
    <div className="stack gap-lg">
      <PageHeader
        title="Training Calendar"
        description="Plan group discussions, aptitude drills, mock interviews, and grammar refreshers."
      />

      <div className="card">
        <h3>Schedule Event</h3>
        <form className="grid grid-3" onSubmit={onSubmit}>
          <label>
            Date
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
            />
          </label>
          <label>
            Name
            <input
              value={form.event_name}
              onChange={(e) => setForm((prev) => ({ ...prev, event_name: e.target.value }))}
              placeholder="e.g., English Grammar"
            />
          </label>
          <label>
            Description
            <input
              value={form.event_description}
              onChange={(e) => setForm((prev) => ({ ...prev, event_description: e.target.value }))}
              placeholder="Optional details"
            />
          </label>
          <button type="submit" className="btn primary" disabled={createMutation.isLoading}>
            Save Event
          </button>
        </form>
      </div>

      <div className="card">
        <div className="filters">
          <label>
            From
            <input
              type="date"
              value={range.startDate}
              onChange={(e) => setRange((prev) => ({ ...prev, startDate: e.target.value }))}
            />
          </label>
          <label>
            To
            <input
              type="date"
              value={range.endDate}
              onChange={(e) => setRange((prev) => ({ ...prev, endDate: e.target.value }))}
            />
          </label>
        </div>

        {eventsQuery.isLoading ? (
          <LoadingSpinner message="Loading training calendar..." />
        ) : (
          <ul className="event-list detailed">
            {eventsQuery.data?.map((event) => (
              <li key={event._id}>
                <div>
                  <strong>{dayjs(event.date).format('DD MMM')}</strong>
                  <p>{event.event_name}</p>
                  <small>{event.event_description}</small>
                </div>
                <div className="event-actions">
                  <label>
                    Completed
                    <input
                      type="checkbox"
                      checked={event.completed}
                      onChange={(e) =>
                        updateMutation.mutate({
                          id: event._id,
                          payload: { completed: e.target.checked }
                        })
                      }
                    />
                  </label>
                  <button className="link danger" onClick={() => deleteMutation.mutate(event._id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EventsManager;


