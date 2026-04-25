const heights = [4, 0, 2, 0, 5, 0, 3];

const calculateAndRenderWater = () => {
  const n = heights.length;
  let leftMax = new Array(n).fill(0);
  let rightMax = new Array(n).fill(0);
  let waterTrapped = new Array(n).fill(0);

  leftMax[0] = heights[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
  }

  rightMax[n - 1] = heights[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
  }

  let totalWater = 0;
  for (let i = 0; i < n; i++) {
    waterTrapped[i] = Math.min(leftMax[i], rightMax[i]) - heights[i];

    if (waterTrapped[i] > 0) {
      totalWater += waterTrapped[i];
    } else {
      waterTrapped[i] = 0;
    }
  }

  renderMap(heights, waterTrapped, totalWater);
};

const renderMap = (heights, waterTrapped, totalWater) => {
  const container = document.getElementById("evelation-map");
  document.getElementById(
    "result"
  ).textContent = `Total Water: ${totalWater} units`;

  const maxOverallHeight = Math.max(...heights);

  let waterBlockCounter = 1;

  for (let i = 0; i < heights.length; i++) {
    const column = document.createElement("div");
    column.classList.add("column");

    const bHeight = heights[i];
    const wHeight = waterTrapped[i];

    for (let level = 0; level < maxOverallHeight; level++) {
      const block = document.createElement("div");
      block.classList.add("block");

      if (level < bHeight) {
        block.classList.add("building");
      } else if (level < bHeight + wHeight) {
        block.classList.add("water");
        block.textContent = waterBlockCounter++;
      } else {
        block.classList.add("empty");
      }
      column.appendChild(block);
    }
    container.appendChild(column);
  }
};

calculateAndRenderWater();
