export default function LoadingButton({ loading, children, loadingText, ...props }) {
  return (
    <button {...props} disabled={loading || props.disabled}>
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}
