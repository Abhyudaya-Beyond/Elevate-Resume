import { t } from "@lingui/macro";
import { BookIcon, SignOutIcon } from "@phosphor-icons/react";
import { Button } from "@elevate/ui";
import { Link } from "react-router";

import { useLogout } from "@/client/services/auth";
import { useAuthStore } from "@/client/stores/auth";

export const HeroCTA = () => {
  const { logout } = useLogout();

  const isLoggedIn = useAuthStore((state) => !!state.user);

  if (isLoggedIn) {
    return (
      <>
        <Button asChild size="lg">
          <Link to="/dashboard">{t`Go to Dashboard`}</Link>
        </Button>

        <Button size="lg" variant="link" onClick={() => logout()}>
          <SignOutIcon className="mr-3" />
          {t`Logout`}
        </Button>
      </>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-gutter-sm">
      {/* Primary CTA - Gold (Dopamine Trigger) */}
      <Button asChild size="lg" variant="accent" className="h-12 transition-all duration-perceptible hover:scale-105">
        <Link to="/auth/login">{t`Start building`}</Link>
      </Button>

      {/* Secondary CTA - Outline (De-emphasized) */}
      <Button asChild size="lg" variant="outline" className="h-12 transition-all duration-perceptible hover:bg-secondary/10">
        <a href="https://elevate.local/docs" target="_blank" rel="noopener noreferrer nofollow">
          <BookIcon className="mr-2" size={18} />
          {t`Learn more`}
        </a>
      </Button>
    </div>
  );
};
