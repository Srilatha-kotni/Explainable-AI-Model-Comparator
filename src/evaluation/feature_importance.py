import numpy as np

def get_feature_importance(model, feature_names):
    # Logistic Regression
    if hasattr(model, "coef_"):
        importance = model.coef_[0]
        return dict(zip(feature_names, importance))

    # Tree-based models
    if hasattr(model, "feature_importances_"):
        importance = model.feature_importances_
        return dict(zip(feature_names, importance))

    return {}
