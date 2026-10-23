/** biome-ignore-all lint/complexity/noUselessFragments: <explanation> */
"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LogOut, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import Logo from "@/assets/svg/logo";
import { useGetMe, useLogout } from "@/hooks/auth.hook";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const queryClient = useQueryClient();

  const { data } = useGetMe();
  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        queryClient.setQueryData(["user"], null);
        queryClient.invalidateQueries();

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

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="ProjectHub home"
        >
          {/* <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
            <FolderKanban className="size-5" />
          </div> */}
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

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme toggle */}
          <Button
            variant="outline"
            size="icon"
            className="size-9 rounded-xl cursor-pointer"
            aria-label={
              mounted
                ? `Switch to ${theme === "dark" ? "light" : "dark"} mode`
                : "Toggle theme"
            }
            title="Toggle theme"
            onClick={() => {
              if (mounted) {
                setTheme(theme === "dark" ? "light" : "dark");
              }
            }}
          >
            {mounted && theme === "dark" ? (
              <Sun className="size-[18px]" />
            ) : (
              <Moon className="size-[18px]" />
            )}
          </Button>

          <div className="hidden h-7 w-px bg-border sm:block" />

          {/* Login */}
          {data?.data ? (
            <>
              <Button
                onClick={handleLogout}
                className="cursor-pointer"
                variant="destructive"
              >
                <LogOut className="size-4" /> Log Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="rounded-xl cursor-pointer px-3 font-medium sm:px-4"
                >
                  Login
                </Button>
              </Link>

              <Link href="/register">
                <Button
                  variant="outline"
                  className="rounded-xl cursor-pointer px-3 font-medium sm:px-4"
                >
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
