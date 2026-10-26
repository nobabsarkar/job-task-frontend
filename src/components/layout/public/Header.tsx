"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Sun,
  UserRound,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Logo from "@/assets/svg/logo";
import { useGetMe, useLogout } from "@/hooks/auth.hook";
import { toast } from "@/components/ui/toast";
import { UserRole } from "@/types/user.type";
import Image from "next/image";

const dashboardRoute: Record<UserRole, string> = {
  SUPER_ADMIN: "/admin",
  MENTOR: "/admin",
  STUDENT: "/student",
};

const Header = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { data } = useGetMe();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const user = data?.data;
  const role = user?.role as UserRole | undefined;

  const dashboardHref = role ? dashboardRoute[role] : "/login";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menus when navigating or changing authentication state.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, []);
  // useEffect(() => {
  //   setMobileMenuOpen(false);
  //   setProfileOpen(false);
  // }, [user?.id]);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        queryClient.setQueryData(["user"], null);
        queryClient.removeQueries({ queryKey: ["user"] });
        queryClient.invalidateQueries();

        setProfileOpen(false);
        setMobileMenuOpen(false);

        toast.add({
          title: "Logout Successful",
          description: "You have been logged out.",
          type: "success",
        });

        router.push("/login");
      },
      onError: () => {
        toast.add({
          title: "Logout Failed",
          description: "Something went wrong. Please try again.",
          type: "error",
        });
      },
    });
  };

  const displayName = user?.name || "My Account";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part: string) => part[0])
    .join("")
    .toUpperCase();

  // Adjust these property names if your User type uses a different avatar field.
  const avatarUrl = user?.profileImage || user?.avatar || user?.image || "";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3"
          aria-label="ProjectHub home"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Logo />

          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-foreground">
              Project<span className="text-primary">Hub</span>
            </span>

            <span className="hidden text-[11px] text-muted-foreground sm:block">
              Submit. Review. Grow.
            </span>
          </div>
        </Link>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Theme toggle */}
          <Button
            variant="outline"
            size="icon"
            className="size-9 cursor-pointer rounded-xl"
            aria-label="Toggle theme"
            title="Toggle theme"
            onClick={() => {
              if (mounted) {
                setTheme(theme === "dark" ? "light" : "dark");
              }
            }}
          >
            {mounted && theme === "dark" ? (
              <Sun className="size-4.5" />
            ) : (
              <Moon className="size-4.5" />
            )}
          </Button>

          <Link href="/">
            <Button className="cursor-pointer">Home</Button>
          </Link>

          {user && role ? (
            /* Profile dropdown */
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((open) => !open)}
                aria-expanded={profileOpen}
                aria-label="Open profile menu"
                className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-border bg-card px-2.5 py-1.5 transition-colors hover:bg-accent"
              >
                {/* Avatar */}
                <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-sm font-bold text-primary ring-1 ring-border">
                  {avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <Image
                      src={avatarUrl}
                      alt={`${displayName}'s profile`}
                      height={200}
                      width={200}
                      className="size-full object-cover"
                    />
                  ) : (
                    initials || <UserRound className="size-5" />
                  )}
                </div>

                <div className="hidden text-left lg:block">
                  <p className="max-w-32 truncate text-sm font-semibold">
                    {displayName}
                  </p>
                  <p className="text-xs capitalize text-muted-foreground">
                    {role.replace("_", " ").toLowerCase()}
                  </p>
                </div>

                <ChevronDown
                  className={`size-4 text-muted-foreground transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {profileOpen && (
                <>
                  {/* Click-away overlay */}
                  <button
                    type="button"
                    aria-label="Close profile menu"
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setProfileOpen(false)}
                  />

                  <div className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-xl animate-in fade-in-0 zoom-in-95 duration-150">
                    {/* Profile information */}
                    <div className="border-b border-border p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 font-bold text-primary">
                          {avatarUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <Image
                              src={avatarUrl}
                              height={200}
                              width={200}
                              alt={displayName}
                              className="size-full object-cover"
                            />
                          ) : (
                            initials || <UserRound className="size-5" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {displayName}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {user?.email}
                          </p>
                          <span className="mt-1 inline-flex rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                            {role.replace("_", " ")}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Menu items */}
                    <div className="p-2">
                      <Link
                        href={dashboardHref}
                        onClick={() => setProfileOpen(false)}
                        className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                      >
                        <LayoutDashboard className="size-4 text-muted-foreground" />
                        Dashboard
                      </Link>

                      <button
                        type="button"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        <LogOut className="size-4" />
                        {isLoggingOut ? "Logging out..." : "Log out"}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Guest desktop actions */
            <>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="cursor-pointer rounded-xl px-4"
                >
                  Login
                </Button>
              </Link>

              <Link href="/register">
                <Button
                  variant="outline"
                  className="cursor-pointer rounded-xl px-4"
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile actions */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile theme toggle */}
          <Button
            variant="outline"
            size="icon"
            className="size-9 cursor-pointer rounded-xl"
            aria-label="Toggle theme"
            onClick={() => {
              if (mounted) {
                setTheme(theme === "dark" ? "light" : "dark");
              }
            }}
          >
            {mounted && theme === "dark" ? (
              <Sun className="size-4.5" />
            ) : (
              <Moon className="size-4.5" />
            )}
          </Button>

          {/* Mobile profile avatar */}
          {user && (
            <button
              type="button"
              onClick={() => {
                setProfileOpen((open) => !open);
                setMobileMenuOpen(false);
              }}
              aria-label="Open profile menu"
              className="flex size-9 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary/10 text-xs font-bold text-primary ring-1 ring-border"
            >
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  height={200}
                  width={200}
                  alt={displayName}
                  className="size-full object-cover"
                />
              ) : (
                initials || <UserRound className="size-5" />
              )}
            </button>
          )}

          {/* Hamburger */}
          <Button
            variant="outline"
            size="icon"
            className="size-9 cursor-pointer rounded-xl"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            onClick={() => {
              setMobileMenuOpen((open) => !open);
              setProfileOpen(false);
            }}
          >
            {mobileMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto max-w-7xl space-y-2 px-4 py-4 sm:px-6">
            {user && role ? (
              <>
                <div className="mb-3 flex items-center gap-3 rounded-xl bg-muted/50 p-3">
                  <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 font-bold text-primary">
                    {avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <Image
                        src={avatarUrl}
                        height={200}
                        width={200}
                        alt={displayName}
                        className="size-full object-cover"
                      />
                    ) : (
                      initials || <UserRound className="size-5" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">
                      {displayName}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <Link
                  href={dashboardHref}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors hover:bg-accent"
                >
                  <LayoutDashboard className="size-4 text-muted-foreground" />
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-60"
                >
                  <LogOut className="size-4" />
                  {isLoggingOut ? "Logging out..." : "Log out"}
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full cursor-pointer rounded-xl"
                  >
                    Login
                  </Button>
                </Link>

                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full cursor-pointer rounded-xl">
                    Register
                  </Button>
                </Link>
              </div>
            )}

            <div className="border-t border-border pt-3">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="block cursor-pointer rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile profile dropdown */}
      {profileOpen && user && (
        <div className="absolute right-4 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-border bg-popover text-popover-foreground shadow-xl md:hidden">
          <div className="border-b border-border p-4">
            <p className="truncate text-sm font-semibold">{displayName}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user?.email}
            </p>
            <p className="mt-1 text-xs font-medium capitalize text-primary">
              {role?.replace("_", " ").toLowerCase()}
            </p>
          </div>

          <div className="p-2">
            <Link
              href={dashboardHref}
              onClick={() => setProfileOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-accent"
            >
              <LayoutDashboard className="size-4" />
              Dashboard
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-60"
            >
              <LogOut className="size-4" />
              {isLoggingOut ? "Logging out..." : "Log out"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
