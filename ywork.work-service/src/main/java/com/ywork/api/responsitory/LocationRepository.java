package com.ywork.api.responsitory;

import com.ywork.api.dto.out.LocationOut;
import com.ywork.api.responsitory.helper.ProceduceCall;
import com.ywork.api.responsitory.helper.ProcedureParameter;
import com.ywork.common.DataStatus.DataStatus;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class LocationRepository {
    private final ProceduceCall proceduceCall;
    public List<LocationOut>  getLocationsWork(String locationId) {
        var out_put = proceduceCall.callOneRefCursor("location_search_province_district",
                List.of(ProcedureParameter.inputParam("in_location", String.class, locationId),
                        ProcedureParameter.outputParam("out_result", String.class),
                        ProcedureParameter.refCursorParam("out_cur")), LocationOut.class);
        String result = (String) out_put.get("out_result");
        if (!DataStatus.SUCCESS.equals(result)){

        }
        return (List<LocationOut>) out_put.get("out_cur");
    }

    public List<String> getLocationSearchWork(String locationId) {
        var out_put = proceduceCall.callOneRefCursor("location_search_group",
                List.of(ProcedureParameter.inputParam("in_location", String.class, locationId),
                        ProcedureParameter.outputParam("out_result", String.class),
                        ProcedureParameter.refCursorParam("out_cur")), LocationOut.class);
        String result = (String) out_put.get("out_result");
        if (!DataStatus.SUCCESS.equals(result)){

        }
        List<LocationOut> list = (List<LocationOut>) out_put.get("out_cur");
        return list.stream().map(LocationOut::getName).toList();
    }
}
