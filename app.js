const matrix = [
  [1, 0, 0, 1, 0],
  [1, 0, 1, 0, 0],
  [0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1],
  [1, 0, 1, 1, 0],
];
console.log(`matrix 2d (${matrix[0].length}x${matrix.length}) => `, matrix);

let arrayXY = [];
for (let x = 0; x < matrix.length; x++) {
  for (let y = 0; y < matrix[x].length; y++) {
    // console.log(`${x},${y}: ${matrix[x][y]}`);
    if (arrayXY.length == 0 && matrix[x][y] == 1) {
      arrayXY.push({ group: 0, members: [`${x},${y}`] });

      if (matrix[x][y + 1] == 1) {
        // console.log("right");
        arrayXY[0].members.push(`${x},${y + 1}`);
      }
      if (matrix[x + 1] != undefined && matrix[x + 1][y] == 1) {
        // console.log("down");
        arrayXY[0].members.push(`${x + 1},${y}`);
      }
    } else if (arrayXY.length > 0 && matrix[x][y] == 1) {
      // console.log("else if");
      let s = arrayXY.find((data) => data.members.includes(`${x},${y}`));

      if (
        matrix[x - 1] != undefined &&
        matrix[x - 1][y] == 0 &&
        matrix[x][y + 1] != undefined &&
        matrix[x - 1][y + 1] == 1 &&
        matrix[x][y + 1] == 1
      ) {
        let topRight = arrayXY.find((data) =>
          data.members.includes(`${x - 1},${y + 1}`)
        );
        if (topRight) {
          topRight.members.push(`${x},${y}`);
        }
      } else if (!s) {
        arrayXY.push({ group: arrayXY.length, members: [`${x},${y}`] });
      }

      s = arrayXY.find((data) => data.members.includes(`${x},${y}`));

      if (matrix[x][y + 1] == 1) {
        // console.log("right");
        const dataRight = arrayXY.find((data) =>
          data.members.includes(`${x},${y + 1}`)
        );
        if (!dataRight) s.members.push(`${x},${y + 1}`);
      }

      if (matrix[x + 1] != undefined && matrix[x + 1][y] == 1) {
        // console.log("down");
        const dataDown = arrayXY.find((data) =>
          data.members.includes(`${x + 1},${y}`)
        );
        if (!dataDown) s.members.push(`${x + 1},${y}`);
      }
    }
  }
}

arrayXY = arrayXY.map((data) => ({
  ...data,
  member_length: data.members.length,
}));

console.log("Group => ", arrayXY);

console.log('Result => ',arrayXY.map((data) => data.member_length))
