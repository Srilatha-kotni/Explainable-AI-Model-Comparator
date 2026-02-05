import pandas as pd

from src.preprocessing.preprocess import load_and_preprocess_data
from src.models.logistic_model import train_logistic_regression
from src.models.decision_tree_model import train_decision_tree
from src.models.random_forest_model import train_random_forest

from src.evaluation.accuracy import calculate_accuracy
from src.evaluation.bias import evaluate_gender_bias
from src.evaluation.stability import evaluate_stability
from src.evaluation.feature_importance import get_feature_importance


def run_model_comparison(csv_path: str):
    # Load and preprocess user dataset
    X_train, X_test, y_train, y_test, df = load_and_preprocess_data(csv_path)

    # Gender column for bias analysis (if exists)
    gender_test = None
    if "Gender" in X_test.columns:
        gender_test = X_test["Gender"]

    # Combine full data for stability
    X_full = pd.concat([X_train, X_test], axis=0)
    y_full = pd.concat([y_train, y_test], axis=0)

    # Train models
    log_model = train_logistic_regression(X_train, y_train)
    dt_model = train_decision_tree(X_train, y_train)
    rf_model = train_random_forest(X_train, y_train)

    # Accuracy
    accuracy = {
        "logistic_regression": calculate_accuracy(log_model, X_test, y_test),
        "decision_tree": calculate_accuracy(dt_model, X_test, y_test),
        "random_forest": calculate_accuracy(rf_model, X_test, y_test),
    }

    # Bias (only if gender exists)
    bias = {}
    if gender_test is not None:
        bias = {
            "logistic_regression": evaluate_gender_bias(
                log_model, X_test, y_test, gender_test
            ),
            "decision_tree": evaluate_gender_bias(
                dt_model, X_test, y_test, gender_test
            ),
            "random_forest": evaluate_gender_bias(
                rf_model, X_test, y_test, gender_test
            ),
        }

    # Stability
    stability = {
        "logistic_regression": evaluate_stability(
            train_logistic_regression, X_full, y_full
        ),
        "decision_tree": evaluate_stability(
            train_decision_tree, X_full, y_full
        ),
        "random_forest": evaluate_stability(
            train_random_forest, X_full, y_full
        ),
    }

    # Feature importance
    feature_names = X_train.columns.tolist()
    feature_importance = {
        "logistic_regression": get_feature_importance(log_model, feature_names),
        "decision_tree": get_feature_importance(dt_model, feature_names),
        "random_forest": get_feature_importance(rf_model, feature_names),
    }

    return {
        "accuracy": accuracy,
        "bias": bias,
        "stability": stability,
        "feature_importance": feature_importance,
    }
