type Props = {
  currentArea: string | null;
  left: number;
  top: number;
  area: string;
};

export default function BigDot(props: Props) {
  if (props.currentArea !== props.area) {
    return;
  }

  return (
    <img
      className="absolute"
      style={{
        left: `${props.left}px`,
        top: `${props.top}px`,
      }}
      src="/big_dot.webp"
    />
  );
}
