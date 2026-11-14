import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </IconBase>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </IconBase>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </IconBase>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </IconBase>
  );
}

export function BookOpenIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 6.5C10.5 5.2 8.4 4.5 6 4.5H4v14h2c2.4 0 4.5.7 6 2 1.5-1.3 3.6-2 6-2h2v-14h-2c-2.4 0-4.5.7-6 2Z" />
      <path d="M12 6.5v14" />
    </IconBase>
  );
}

export function WrenchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14.7 6.3a4.5 4.5 0 0 0-5.9 5.9L4 17v3h3l4.8-4.8a4.5 4.5 0 0 0 5.9-5.9l-2.6 2.6-3-3 2.6-2.6Z" />
    </IconBase>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3 5 6v5c0 4.4 2.8 8.1 7 10 4.2-1.9 7-5.6 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </IconBase>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m5 12 4.5 4.5L19 7" />
    </IconBase>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m9 6 6 6-6 6" />
    </IconBase>
  );
}

export function AlertTriangleIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M10.3 4.2 2.6 17.5A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.5L13.7 4.2a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </IconBase>
  );
}

export function GaugeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      <path d="M13.4 10.6 17 7" />
      <path d="M4.5 19a9 9 0 1 1 15 0" />
      <path d="M4.5 19h15" />
    </IconBase>
  );
}
