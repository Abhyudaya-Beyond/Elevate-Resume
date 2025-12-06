import { t } from "@lingui/macro";
import { PlusIcon } from "@phosphor-icons/react";
import type { ResumeDto } from "@elevate/dto";
import { KeyboardShortcut } from "@elevate/ui";

import { useDialog } from "@/client/stores/dialog";

import { BaseListItem } from "./base-item";

export const CreateResumeListItem = () => {
  const { open } = useDialog<ResumeDto>("resume");

  return (
    <BaseListItem
      start={<PlusIcon size={18} />}
      title={
        <>
          <span>{t`Create a new resume`}</span>
          {/* eslint-disable-next-line lingui/no-unlocalized-strings */}
          <KeyboardShortcut className="ml-2">^N</KeyboardShortcut>
        </>
      }
      description={t`Start building from scratch`}
      onClick={() => {
        open("create");
      }}
    />
  );
};
