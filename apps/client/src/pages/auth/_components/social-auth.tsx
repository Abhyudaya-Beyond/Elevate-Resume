import { t } from "@lingui/macro";
import { FingerprintIcon, GithubLogoIcon, GoogleLogoIcon } from "@phosphor-icons/react";
import { Button } from "@elevate/ui";

import { useAuthProviders } from "@/client/services/auth/providers";

export const SocialAuth = () => {
  const { providers } = useAuthProviders();

  if (!providers || providers.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-gutter-sm">
      {providers.includes("github") && (
        <Button
          asChild
          size="lg"
          variant="outline"
          className="w-full h-11 transition-all duration-perceptible hover:bg-secondary"
        >
          <a href="/api/auth/github">
            <GithubLogoIcon className="mr-2 size-4" />
            {t`GitHub`}
          </a>
        </Button>
      )}

      {providers.includes("google") && (
        <Button
          asChild
          size="lg"
          variant="outline"
          className="w-full h-11 transition-all duration-perceptible hover:bg-secondary"
        >
          <a href="/api/auth/google">
            <GoogleLogoIcon className="mr-2 size-4" />
            {t`Google`}
          </a>
        </Button>
      )}

      {providers.includes("openid") && (
        <Button
          asChild
          size="lg"
          variant="outline"
          className="w-full h-11 transition-all duration-perceptible hover:bg-secondary"
        >
          <a href="/api/auth/openid">
            <FingerprintIcon className="mr-2 size-4" />
            {import.meta.env.VITE_OPENID_NAME}
          </a>
        </Button>
      )}
    </div>
  );
};
