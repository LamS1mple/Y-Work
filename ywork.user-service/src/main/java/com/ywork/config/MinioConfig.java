package com.ywork.config;


import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class MinioConfig {
    @Value("${spring.minio.url}")
    private String url = "http://localhost:9000";
    @Value("${spring.minio.access-key}")
    private String accessKey = "minioadmin";
    @Value("${spring.minio.access-key}")
    private String secretKey = "minioadmin";
    @Value("${spring.minio.bucket}")
    public static String bucket ="user";
    @Bean
    public MinioClient getMinioClient() {
        return MinioClient.builder()
                .endpoint(url)
                .credentials(accessKey, secretKey).build();
    }

//    public static void main(String[] args) throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
//        Config cfg = new Config();
//        MinioClient minioClient = cfg.getMinioClient();
//        String url = minioClient.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
//                        .bucket("ed220627-fb0f-4721-ba4c-77cf70d285e3")
//                        .object("LG_logo.png")
//                        .method(Method.GET)
//                .expiry(1, TimeUnit.HOURS).build());
//        System.out.println(url);
//    }
}
