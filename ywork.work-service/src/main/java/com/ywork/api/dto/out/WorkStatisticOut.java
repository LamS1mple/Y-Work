package com.ywork.api.dto.out;

import com.ywork.api.responsitory.helper.Col;
import lombok.Data;

@Data
public class WorkStatisticOut {
    @Col("work_id")
    private String workId;
    @Col("name_work")
    private String nameWork;
    @Col("total")
    private Long total;
    @Col("accept")
    private Long accept;
    @Col("reject")
    private Long reject;
    @Col("nothing")
    private Long nothing;
}
