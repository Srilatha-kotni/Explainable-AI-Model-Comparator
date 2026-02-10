export async function uploadDataset(file) {
  console.log("Uploading file:", file.name);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        accuracy: {
          RandomForest: 0.91,
          LogisticRegression: 0.86,
        },
        bias: {
          RandomForest: 0.08,
          LogisticRegression: 0.12,
        },
        stability: {
          RandomForest: 0.90,
          LogisticRegression: 0.88,
        },
      });
    }, 1500);
  });
}
