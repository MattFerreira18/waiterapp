import Icon from "@/ui/components/icon";
import type { IconTypes } from "@/ui/components/icon";
import Link from "@/ui/components/link";

import { containerVariants, dash, iconVariants } from "./styles.css";

type OptionProps = {
  active: boolean;
  link?: string;
  icon: IconTypes;
  title: string;
  onClick?: () => void;
};

function Option({ active, icon, link, title, onClick }: OptionProps) {
  if (!link) {
    return (
      <button
        className={
          active ? containerVariants.active : containerVariants.default
        }
        onClick={onClick}
      >
        <Icon
          name={icon}
          className={active ? iconVariants.active : iconVariants.default}
        />
        <span>{title}</span>
        {active && <div className={dash} />}
      </button>
    );
  }

  return (
    <Link
      key={link}
      to={link}
      className={active ? containerVariants.active : containerVariants.default}
    >
      <Icon
        name={icon}
        className={active ? iconVariants.active : iconVariants.default}
      />
      <span>{title}</span>
      {active && <div className={dash} />}
    </Link>
  );
}

export default Option;
