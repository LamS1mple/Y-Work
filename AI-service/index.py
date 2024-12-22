from flask import Flask, json, jsonify, request
from flask_cors import CORS  # Import CORS
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
import psycopg2
import pandas as pd

# Kết nối đến cơ sở dữ liệu PostgreSQL


def recomment(data):
    cursor.execute('SELECT c.company_id,c.avatar, c."name" AS "name_company",w.work_id, w.name_work, w.salary_min , w.salary_max , w."location" , w.due_date, (SELECT string_agg(s.skill_id,\' \') FROM work_skill ws INNER JOIN skill s ON ws.skill_id =  s.skill_id WHERE ws.work_id = w.work_id ) AS skill FROM company c INNER JOIN "work" w ON c.company_id = w.company_id WHERE w.due_date >= now() and w.status = 1')
    result = cursor.fetchall()
    columns = [desc[0] for desc in cursor.description]
    df = pd.DataFrame(result, columns=columns)
    
    # Xử lý dữ liệu cột name_work
    df['name_work'] = df['name_work'].apply(lambda s: s.replace("-", "").lower())

    # Sử dụng TfidfVectorizer
    vectorizer = TfidfVectorizer(ngram_range=(1, 3))
    tfidf_matrix_name = vectorizer.fit_transform(df['name_work'])

    # Biến đổi chuỗi yêu cầu sang ma trận TF-IDF
    tfidf_matrix_name_req = vectorizer.transform(data)

    # Tính độ tương đồng cosin
    similarity_scores = cosine_similarity(tfidf_matrix_name, tfidf_matrix_name_req)

    # Chuyển kết quả về DataFrame để dễ dàng phân tích
    similarity_df = pd.DataFrame(
        similarity_scores,
        index=df['work_id'],
        columns=data
    )

    # In kết quả
    # print("Ma trận TF-IDF:")
    # print(pd.DataFrame(tfidf_matrix_name.toarray(), columns=vectorizer.get_feature_names_out(), index=df['name_work']))

    max_values_per_row = similarity_df.max(axis=1)
    result_dict = dict(zip(df['work_id'], max_values_per_row))
    # max_values_per_row.sort_values(ascending=False, inplace=True)
    # print(max_values_per_row)
    # top_name_work = max_values_per_row.index.to_numpy()

    return result_dict




app = Flask(__name__)

CORS(app)

@app.post('/recommend')
def hello_world():
    data = request.get_json()
    result = recomment(data)
    return jsonify(result)

if __name__ == '__main__':
    conn = psycopg2.connect("dbname=ywork host=localhost user=postgres password=lam2002 port=5432")
    cursor = conn.cursor()
    app.run(debug=True)


