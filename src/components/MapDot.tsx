type Props = { x: number; y: number };

export default function MapDot(props: Props) {
  const ORIGIN_X = 320;
  const ORIGIN_Y = 235;

  const left = ORIGIN_X + props.x - 10;
  const top = ORIGIN_Y + props.y - 10;

  return (
    <img
      className="absolute"
      src="/grandis_area_dot.webp"
      style={{
        left: `${left}px`,
        top: `${top}px`,
      }}
    />
  );
}
