interface IProps {
  emptyMessage: string;
  loading: boolean;
  error: string;
}

export function StatusCard({ emptyMessage, loading, error }: IProps) {
  if (!emptyMessage && !loading && !error) return null;

  return (

    <div className={`card card-blue d-flex justify-content-center align-items-center lead text-white ${error ? 'bg-transparent border-danger' : ''}`}>
      {emptyMessage && !loading && !error && emptyMessage}

      {loading && (
        <div className="spinner-border text-white" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}

      {error && (
        <div className="text-danger d-flex align-items-center">{error}</div>
      )}
    </div>
  )
}