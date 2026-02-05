import numpy as np

def evaluate_gender_bias(model, X_test, y_test, gender_series):
    predictions = model.predict(X_test)

    male_mask = gender_series == 1
    female_mask = gender_series == 0

    male_accuracy = np.mean(predictions[male_mask] == y_test[male_mask])
    female_accuracy = np.mean(predictions[female_mask] == y_test[female_mask])

    bias_gap = abs(male_accuracy - female_accuracy)

    return {
        "male_accuracy": male_accuracy,
        "female_accuracy": female_accuracy,
        "bias_gap": bias_gap
    }
