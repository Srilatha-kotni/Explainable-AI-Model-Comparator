import numpy as np
from sklearn.model_selection import train_test_split

def evaluate_stability(model_trainer, X, y, runs=10):
    accuracies = []

    for seed in range(runs):
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=seed
        )

        model = model_trainer(X_train, y_train)
        acc = model.score(X_test, y_test)
        accuracies.append(acc)

    return {
        "mean_accuracy": np.mean(accuracies),
        "std_deviation": np.std(accuracies)
    }
