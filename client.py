import requests
import json
from types import SimpleNamespace
import psycopg2
import json
import pandas as pd
from psycopg2 import sql
from psycopg2 import OperationalError, DatabaseError

r = requests.get('https://dragonball-api.com/api/characters')

json_data = json.loads(r.text)

df = pd.DataFrame(json_data['items'])

# # Datos de conexión
conn_params = {
    'dbname': 'Ki',
    'user': 'postgres',
    'password': '1234',
    'host': 'localhost',
    'port': '5432'
}

def create_table_from_dataframe(df, table_name, conn_params):
    conn = None
    cur = None
    try:
        # Connect to the PostgreSQL database
        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

        # Sample the first row to infer column types
        sample_item = df.iloc[0].to_dict()

        # Determine column types
        columns = []
        for key, value in sample_item.items():
            if isinstance(value, int):
                col_type = "INTEGER"
            elif isinstance(value, str):
                col_type = "TEXT"
            elif isinstance(value, float):
                col_type = "REAL"
            elif value is None:
                col_type = "TEXT"
            else:
                col_type = "TEXT"  
            columns.append(f"{key} {col_type}")

        # Create the table creation query dynamically
        columns_sql = ", ".join(columns)
        create_table_query = f"CREATE TABLE IF NOT EXISTS {table_name} ({columns_sql});"

        cur.execute(create_table_query)
        conn.commit()

        print('Create table complete')

    except (OperationalError, DatabaseError) as e:
        print(f"An error occurred: {e}")
        if conn:
            conn.rollback()  

    finally:
        if cur:
            cur.close()  
        if conn:
            conn.close()  

def insert_data_from_dataframe(df, table_name, conn_params):
    
    conn = None
    cur = None
    try:
   
        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

        # Create the insert statement dynamically
        columns = df.columns
        columns_sql = ", ".join(columns)
        values_sql = ", ".join([f"%({col})s" for col in columns])

        insert_query = sql.SQL("INSERT INTO {table} ({fields}) VALUES ({values})").format(
            table=sql.Identifier(table_name),
            fields=sql.SQL(columns_sql),
            values=sql.SQL(values_sql)
        )

        # Insert data into the table
        for i, row in df.iterrows():
            cur.execute(insert_query, row.to_dict())

        conn.commit()

        print('Insert complete')

    except (OperationalError, DatabaseError) as e:
            print(f"An error occurred: {e}")
            if conn:
                conn.rollback()  

    finally:

        if cur:
            cur.close()  
        if conn:
            conn.close()  
            
create_table_from_dataframe(df, 'personajes', conn_params)
insert_data_from_dataframe(df, 'personajes', conn_params)





