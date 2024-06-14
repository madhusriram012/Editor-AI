function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSortHelper(array, 0, array.length - 1, animations);

  return animations;
}

function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        let temp = array[j + 1];
        array[j + 1] = array[j];
        array[j] = temp;
        animations.push([j, j + 1, array[j], array[j + 1]]);
      }
    }
  }
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

function quickSortHelper(mainArray, startIdx, endIdx, animations) {
  if (startIdx < endIdx) {
    let pi = partition(mainArray, startIdx, endIdx, animations);
    quickSortHelper(mainArray, startIdx, pi - 1, animations);
    quickSortHelper(mainArray, pi + 1, endIdx, animations);
  }

  return animations;
}

function partition(mainArray, startIdx, endIdx, animations) {
  const pivot = mainArray[endIdx];
  let i = startIdx - 1;
  for (let j = startIdx; j < endIdx; j++) {
    if (mainArray[j] < pivot) {
      i = i + 1;
      const temp = mainArray[i];
      mainArray[i] = mainArray[j];
      mainArray[j] = temp;
      animations.push([i, j, mainArray[i], mainArray[j]]);
    }
  }

  const temp = mainArray[i + 1];
  mainArray[i + 1] = mainArray[endIdx];
  mainArray[endIdx] = temp;
  animations.push([i + 1, endIdx, mainArray[i + 1], mainArray[endIdx]]);

  return i + 1;
}

export {
  getMergeSortAnimations,
  getQuickSortAnimations,
  getBubbleSortAnimations,
};
