import pandas as pd

from preprocessing.preprocess import load_and_preprocess_data
from models.logistic_model import train_logistic_regression
from models.decision_tree_model import train_decision_tree
from models.random_forest_model import train_random_forest

from evaluation.accuracy import calculate_accuracy
from evaluation.bias import evaluate_gender_bias
from evaluation.stability import evaluate_stability
from evaluation.feature_importance import get_feature_importance


def main():
    # Load and preprocess data
    X_train, X_test, y_train, y_test, df = load_and_preprocess_data(
        r"C:\Users\kotni\Downloads\loan.csv"
    )

    # Gender column for bias analysis
    gender_test = X_test["Gender"]

    # Combine full dataset for stability analysis
    X_full = pd.concat([X_train, X_test], axis=0)
    y_full = pd.concat([y_train, y_test], axis=0)

    # ===============================
    # Train Models
    # ===============================
    log_model = train_logistic_regression(X_train, y_train)
    dt_model = train_decision_tree(X_train, y_train)
    rf_model = train_random_forest(X_train, y_train)

    # ===============================
    # Accuracy
    # ===============================
    log_acc = calculate_accuracy(log_model, X_test, y_test)
    dt_acc = calculate_accuracy(dt_model, X_test, y_test)
    rf_acc = calculate_accuracy(rf_model, X_test, y_test)

    # ===============================
    # Bias Analysis (Gender)
    # ===============================
    log_bias = evaluate_gender_bias(log_model, X_test, y_test, gender_test)
    dt_bias = evaluate_gender_bias(dt_model, X_test, y_test, gender_test)
    rf_bias = evaluate_gender_bias(rf_model, X_test, y_test, gender_test)

    # ===============================
    # Stability Analysis
    # ===============================
    log_stability = evaluate_stability(train_logistic_regression, X_full, y_full)
    dt_stability = evaluate_stability(train_decision_tree, X_full, y_full)
    rf_stability = evaluate_stability(train_random_forest, X_full, y_full)

    # ===============================
    # Feature Importance
    # ===============================
    feature_names = X_train.columns

    log_features = get_feature_importance(log_model, feature_names)
    dt_features = get_feature_importance(dt_model, feature_names)
    rf_features = get_feature_importance(rf_model, feature_names)

    # ===============================
    # PRINT RESULTS
    # ===============================
    print("\nMODEL ACCURACY")
    print("----------------")
    print("Logistic Regression:", log_acc)
    print("Decision Tree      :", dt_acc)
    print("Random Forest      :", rf_acc)

    print("\nBIAS ANALYSIS (Gender)")
    print("----------------------")
    print("Logistic Regression:", log_bias)
    print("Decision Tree      :", dt_bias)
    print("Random Forest      :", rf_bias)

    print("\nSTABILITY ANALYSIS")
    print("------------------")
    print("Logistic Regression:", log_stability)
    print("Decision Tree      :", dt_stability)
    print("Random Forest      :", rf_stability)

    print("\nFEATURE IMPORTANCE (Top 5)")
    print("--------------------------")

    print("\nLogistic Regression:")
    for k, v in sorted(log_features.items(), key=lambda x: abs(x[1]), reverse=True)[:5]:
        print(f"{k}: {v}")

    print("\nDecision Tree:")
    for k, v in sorted(dt_features.items(), key=lambda x: x[1], reverse=True)[:5]:
        print(f"{k}: {v}")

    print("\nRandom Forest:")
    for k, v in sorted(rf_features.items(), key=lambda x: x[1], reverse=True)[:5]:
        print(f"{k}: {v}")


if __name__ == "__main__":
    main()
