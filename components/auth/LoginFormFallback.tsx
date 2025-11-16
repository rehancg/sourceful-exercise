/**
 * Loading fallback component for LoginForm
 * Used in Suspense boundary
 */
export function LoginFormFallback() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded mb-2"></div>
      <div className="h-4 bg-gray-200 rounded mb-8"></div>
      <div className="h-12 bg-gray-200 rounded mb-6"></div>
      <div className="h-12 bg-gray-200 rounded"></div>
    </div>
  );
}

