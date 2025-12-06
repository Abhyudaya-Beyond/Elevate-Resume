import { t } from "@lingui/macro";
import { cn } from "@elevate/utils";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { Link, matchRoutes, Outlet, useLocation } from "react-router";

import { LocaleSwitch } from "@/client/components/locale-switch";
import { Logo } from "@/client/components/logo";
import { ThemeSwitch } from "@/client/components/theme-switch";
import { useAuthProviders } from "@/client/services/auth/providers";

import { SocialAuth } from "./_components/social-auth";

const authRoutes = [{ path: "/auth/login" }, { path: "/auth/register" }];

export const AuthLayout = () => {
  const location = useLocation();
  const { providers } = useAuthProviders();
  const isAuthRoute = useMemo(() => matchRoutes(authRoutes, location) !== null, [location]);

  if (!providers) return null;

  // Condition (providers.length === 1) hides the divider if providers[] includes only "email"
  const hideDivider = !providers.includes("email") || providers.length === 1;

  return (
    <div className="flex h-screen w-screen bg-background">
      {/* Left Panel - Form Content (Cream Background) */}
      <div className="relative flex w-full flex-col justify-center gap-y-8 px-gutter-sm sm:px-gutter lg:px-gutter-lg">
        {/* Top Navigation - Locale & Theme Switches */}
        <div className="absolute top-gutter right-gutter flex items-center gap-x-2 z-10">
          <LocaleSwitch />
          <ThemeSwitch />
        </div>

        {/* Centered Content */}
        <div className="w-full max-w-[400px] mx-auto">
          <Outlet />

          {isAuthRoute && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.2 }}
                className={cn("flex items-center gap-x-4 my-gutter", hideDivider && "hidden")}
              >
                <hr className="flex-1 border-border" />
                <span className="text-xs font-medium text-foreground/60">
                  {t({
                    message: "or continue with",
                    context:
                      "The user can either login with email/password, or continue with GitHub or Google.",
                  })}
                </span>
                <hr className="flex-1 border-border" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.2 }}
              >
                <SocialAuth />
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
