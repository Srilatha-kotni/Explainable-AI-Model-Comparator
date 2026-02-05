import pandas as pd
from sklearn.model_selection import train_test_split

def load_and_preprocess_data(csv_path):
    df = pd.read_csv(csv_path)

    # 1. Drop ID column
    if 'Loan_ID' in df.columns:
        df = df.drop('Loan_ID', axis=1)

    # 2. Fix Dependents FIRST (before anything else)
    df['Dependents'] = df['Dependents'].replace('3+', '3')

    # 3. Encode categorical columns
    df['Gender'] = df['Gender'].map({'Male': 1, 'Female': 0})
    df['Married'] = df['Married'].map({'Yes': 1, 'No': 0})
    df['Education'] = df['Education'].map({'Graduate': 1, 'Not Graduate': 0})
    df['Self_Employed'] = df['Self_Employed'].map({'Yes': 1, 'No': 0})
    df['Loan_Status'] = df['Loan_Status'].map({'Y': 1, 'N': 0})

    df['Property_Area'] = df['Property_Area'].map({
        'Urban': 2,
        'Semiurban': 1,
        'Rural': 0
    })

    # 4. Convert Dependents to numeric
    df['Dependents'] = pd.to_numeric(df['Dependents'], errors='coerce')

    # 5. Drop rows with any remaining NaNs
    df = df.dropna()

    # 6. Separate features and target
    X = df.drop('Loan_Status', axis=1)
    y = df['Loan_Status']

    # 7. Train-test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    return X_train, X_test, y_train, y_test, df