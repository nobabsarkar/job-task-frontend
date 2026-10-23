import { Home, ShieldAlert } from "lucide-react";
import Link from "next/link";

const AccessDenied = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-6">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border bg-background p-8 text-center shadow-sm">
          {/* Icon */}
          <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
            <ShieldAlert className="size-10 text-red-500" />
          </div>

          {/* Error Code */}
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-red-500">
            Error 403
          </p>

          {/* Title */}
          <h1 className="text-2xl font-bold tracking-tight">Access Denied</h1>

          {/* Description */}
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
            You don&apos;t have permission to access this page. Please make sure
            you&apos;re using an account with the required permissions.
          </p>

          {/* Actions */}
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Home className="size-4" />
              Go to Home
            </Link>
          </div>

          {/* Bottom message */}
          <div className="mt-7 border-t pt-5">
            <p className="text-xs text-muted-foreground">
              If you believe this is a mistake, please contact your
              administrator.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
