export default function LoadingOverlay({ show }) {
  return (
    <div className={`fixed inset-0 pointer-events-none transition ${show ? 'opacity-100' : 'opacity-0'} ${show ? '' : 'delay-300'}`}>
      {show && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="h-12 w-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
        </div>
      )}
    </div>
  );
}
