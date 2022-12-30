type LogOffIconProps = {
  size?: number;
};

function LogOffIcon({ size = 24, ...props }: LogOffIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.657 6.34302C20.781 9.46702 20.781 14.533 17.657 17.657C14.533 20.781 9.467 20.781 6.343 17.657C3.219 14.533 3.219 9.46702 6.343 6.34302M12 4V12"
        stroke="#666666"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        {...props}
      />
    </svg>
  );
}

export default LogOffIcon;