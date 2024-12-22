from sklearn.feature_extraction.text import TfidfVectorizer
import psycopg2
import pandas as pd

# Kết nối đến cơ sở dữ liệu PostgreSQL
conn = psycopg2.connect("dbname=ywork host=localhost user=postgres password=lam2002 port=5432")
cursor = conn.cursor()

# Thực thi truy vấn
cursor.execute('SELECT c.company_id,c.avatar, c."name" AS "name_company",w.work_id, w.name_work, w.salary_min , w.salary_max , w."location" , w.due_date, (SELECT string_agg(s.skill_id,\' \') FROM work_skill ws INNER JOIN skill s ON ws.skill_id =  s.skill_id WHERE ws.work_id = w.work_id ) AS skill FROM company c INNER JOIN "work" w ON c.company_id = w.company_id WHERE w.due_date >= now() and w.status = 1')
result = cursor.fetchall()
columns = [desc[0] for desc in cursor.description]
df = pd.DataFrame(result, columns=columns)
df['skill'] = df['skill'].apply(lambda s: s.replace("-", "") )
vectorizer = TfidfVectorizer(ngram_range=(1,1))
tfidf_matrix_skill = vectorizer.fit_transform(df['skill'])

tfidf_matrix = pd.DataFrame(tfidf_matrix_skill.toarray(), columns=vectorizer.get_feature_names_out(), index= df['name_work'])


vectorizer = TfidfVectorizer(ngram_range=(1,2))
tfidf_matrix_skill = vectorizer.fit_transform(["Java developer"])

print()
