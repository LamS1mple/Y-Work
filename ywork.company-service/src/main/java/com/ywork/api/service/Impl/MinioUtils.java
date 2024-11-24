package com.ywork.api.service.Impl;

import io.minio.*;
import io.minio.http.Method;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@AllArgsConstructor
public class MinioUtils {
    private final MinioClient minioClient;

    @SneakyThrows(Exception.class)
    public void createBucket(String bucketName) {
        if (!checkBucket(bucketName)) {
            minioClient.makeBucket(MakeBucketArgs.builder()
                    .bucket(bucketName).build());
        }
    }
    @SneakyThrows(Exception.class)
    private boolean checkBucket(String bucketName) {
        return minioClient.bucketExists(BucketExistsArgs.builder().bucket(bucketName).build());
    }

    private boolean isObjectExists(String bucketName, String objectName) {
        try{
            minioClient.statObject(StatObjectArgs.builder().bucket(bucketName).object(objectName).build());
        }catch(Exception e){
            log.info(e.getMessage());
            return false;
        }
        return true;
    }

    public void uploadFile(String bucketName, String objectName, MultipartFile file) {
        try {
            InputStream inputStream = file.getInputStream();
            minioClient.putObject(PutObjectArgs.builder()
                    .contentType(file.getContentType())
                    .bucket(bucketName).object(objectName).stream(inputStream, inputStream.available(), -1)
                    .build());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    public String getUrlFile(String bucketName, String objectName) {
        try {

            String url = minioClient.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
                    .bucket(bucketName)
                    .object(objectName)
                    .method(Method.GET).build());
            return url;
        } catch (Exception e) {
            log.info(e.getMessage());
            return "";
        }

    }
}
