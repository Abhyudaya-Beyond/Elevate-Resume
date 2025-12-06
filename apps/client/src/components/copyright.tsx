import { t } from "@lingui/macro";
import { cn } from "@elevate/utils";

type Props = {
  className?: string;
};

export const Copyright = ({ className }: Props) => (
  <div
    className={cn(
      "prose prose-sm prose-zinc flex max-w-none flex-col gap-y-1 text-xs opacity-40 dark:prose-invert",
      className,
    )}
  >
    <span>
      {t`Elevate`} {"v" + appVersion}
    </span>
  </div>
);
