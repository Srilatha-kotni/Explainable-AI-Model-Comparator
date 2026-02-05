export function recommendModel(results, priority) {
  if (priority === "accuracy") {
    return Object.entries(results.accuracy)
      .sort((a, b) => b[1] - a[1])[0][0];
  }

  if (priority === "fairness") {
    return Object.entries(results.bias)
      .sort((a, b) => a[1].bias_gap - b[1].bias_gap)[0][0];
  }

  if (priority === "stability") {
    return Object.entries(results.stability)
      .sort((a, b) => a[1].std_deviation - b[1].std_deviation)[0][0];
  }

  return null;
}
