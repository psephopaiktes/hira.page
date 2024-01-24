const Squircle = ({
  returnFormat = "svg",

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
}) => {

  // If the string contains a space, split into CSS border-radius format
  const parseInput = (input) => {
    const r = [0, 0, 0, 0];
    const numList = String(input).split(" ");
    for (let i = 0; i < 4; i++) r[i] = parseInt(numList[i % numList.length]);
    if (numList.length == 3) r[3] = parseInt(numList[1]);
    return r;
  };

  const rx = parseInput(radiusX);
  const ry = parseInput(radiusY);
  const cx = parseInput(curveX || curve || radiusX || radius);
  const cy = parseInput(curveY || curve || radiusY || radius);

  const d = `M 0,${ry[0]} C 0,${ry[0] - cy[0]} ${rx[0] - cx[0]},0 ${rx[0]},0 S ${width - rx[1] - cx[1]},0 ${width - rx[1]},0 ${width},${ry[1] - cy[1]} ${width},${ry[1]} ${width},${height - ry[2] - cy[2]} ${width},${height - ry[2]} ${width - rx[2] + cx[2]},${height} ${width - rx[2]},${height} ${rx[3] + cx[3]},${height} ${rx[3]},${height} 0,${height - ry[3] + cy[3]} 0,${height - ry[3]} 0, ${ry[0] + cy[0]} 0,${ry[0]}`;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><path fill="${fill}" d="${d}" /></svg>`;

  if (returnFormat == "svg")
    return svg;
  else if (returnFormat == "path")
    return d;
  else if (returnFormat == "dataUrl")
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  else
    console.error("Invalid returnFormat");

};

export { Squircle };
