export default function Loading() {
  return (
    <div
      className="min-h-screen px-4 py-10"
      style={{
        background:
          "linear-gradient(135deg, #f0fafe 0%, #fff8f2 50%, #fff3ea 100%)",
      }}
    >
      <div className="mx-auto max-w-md space-y-6 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-white/70" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-12 rounded bg-white/70" />
            <div className="h-5 w-24 rounded bg-white/70" />
          </div>
        </div>
        <div className="h-32 rounded-3xl bg-white/70" />
        <div className="h-40 rounded-3xl bg-white/70" />
        <div className="h-24 rounded-3xl bg-white/70" />
        <div className="h-32 rounded-3xl bg-white/70" />
      </div>
    </div>
  );
}
