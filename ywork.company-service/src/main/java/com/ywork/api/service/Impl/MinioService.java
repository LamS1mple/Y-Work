package com.ywork.api.service.Impl;

import io.minio.MinioClient;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MinioService {
    private final MinioClient minioClient;
}
