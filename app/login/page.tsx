import { Suspense } from 'react';
import { Logo } from '@/components/ui/Logo';
import { LoginForm } from '@/components/auth/LoginForm';
import { LoginFormFallback } from '@/components/auth/LoginFormFallback';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-r-violet-blue-green-subtle px-4 py-8">
      <div className="mb-8">
        <Logo href="/" showText={true} size="md" />
      </div>

      <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-md">
          <Suspense fallback={<LoginFormFallback />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

