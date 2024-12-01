package com.ywork.api.dto.out;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ywork.api.responsitory.helper.Col;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CandidateOut {
    @Col("user_id")
    private String userId;
    @Col("avatar")
    private String avatar;
    private String urlAvatar;
    @Col("name_account")
    private String nameAccount;
    @Col("candidate_id")
    private String candidateId;
    @Col("file")
    private String file;
    private String urlFile;
    @JsonFormat(pattern = "dd/MM/yyyy")
    @Col("date_created")
    private LocalDateTime dateCreated;
    @Col("status")
    private Integer status;
}
