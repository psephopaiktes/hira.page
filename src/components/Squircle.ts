interface options {
  format?: "svg" | "path" | "dataUrl";
  width?: number;
  height?: number;
  fill?: string;
  radius?: number | string;
  radiusX?: number | string;
  radiusY?: number | string;
  curve?: number | string;
  curveX?: number | string;
  curveY?: number | string;
}

const Squircle = ({
  format = "svg",

  // Style
  width = 240,
  height = 240,
  fill,

  // Radius Size
  radius = 120,
  radiusX = radius,
  radiusY = radius,

  // Curve Handle Length
  // curve/radius=0.55が基本の角丸に近いサイズ
  curve,
  curveX,
  curveY,
}: options) => {

  // Parse input for border-radius style values
  const parseInput = (input: number | string): number[] => {
    const values = typeof input === "string" ? input.split(" ").map(Number) : [input];
    // If the string contains a space, split into CSS border-radius format
    const [topLeft, topRight = topLeft, bottomRight = topLeft, bottomLeft = topRight] = values;
    return [topLeft, topRight, bottomRight, bottomLeft];
  };

  const rx = parseInput(radiusX);
  const ry = parseInput(radiusY);
  const cx = parseInput(curveX || curve || radiusX || radius);
  const cy = parseInput(curveY || curve || radiusY || radius);

  const d = `
    M 0,${ry[0]}
    C 0,${ry[0] - cy[0]} ${rx[0] - cx[0]},0 ${rx[0]},0
    S ${width - rx[1] - cx[1]},0 ${width - rx[1]},0
    ${width},${ry[1] - cy[1]} ${width},${ry[1]}
    ${width},${height - ry[2] - cy[2]} ${width},${height - ry[2]}
    ${width - rx[2] + cx[2]},${height} ${width - rx[2]},${height}
    ${rx[3] + cx[3]},${height} ${rx[3]},${height}
    0,${height - ry[3] + cy[3]} 0,${height - ry[3]}
    0,${ry[0] + cy[0]} 0,${ry[0]}
  `.trim();

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <path fill="${fill}" d="${d}" />
    </svg>
  `.trim();

  switch (format) {
    case "svg":
      return svg;
    case "path":
      return d;
    case "dataUrl":
      return `data:image/svg+xml,${encodeURIComponent(svg)}`;
    default:
      throw new Error("Invalid format. Use 'svg', 'path', or 'dataUrl'.");
  }

};

export { Squircle };
