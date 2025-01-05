package com.ywork.api.responsitory;

import com.ywork.api.dto.out.LocationOut;
import com.ywork.api.responsitory.helper.ProceduceCall;
import com.ywork.api.responsitory.helper.ProcedureParameter;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class LocationRepository {
    private final ProceduceCall proceduceCall;
    public List<LocationOut> getProvinceAndDistrict(){
        var out_put = proceduceCall.callOneRefCursor("location_province_district",
                List.of(ProcedureParameter.refCursorParam("out_cur")), LocationOut.class);
        return (List<LocationOut>) out_put.get("out_cur");
    }

    public List<LocationOut> getDistrict(String provinceId) {
        var out_put = proceduceCall.callOneRefCursor("location_district",
                List.of(ProcedureParameter.inputParam("in_province_id", String.class, provinceId),
                        ProcedureParameter.refCursorParam("out_cur")), LocationOut.class);
        return (List<LocationOut>) out_put.get("out_cur");
    }
    public List<LocationOut> getWard(String districtId) {
        var out_put = proceduceCall.callOneRefCursor("location_ward",
                List.of(ProcedureParameter.inputParam("in_district_id", String.class, districtId),
                        ProcedureParameter.refCursorParam("out_cur")), LocationOut.class);
        return (List<LocationOut>) out_put.get("out_cur");
    }
    public List<LocationOut> getProvince() {
        var out_put = proceduceCall.callOneRefCursor("location_province",
                List.of(ProcedureParameter.refCursorParam("out_cur")), LocationOut.class);
        return (List<LocationOut>) out_put.get("out_cur");
    }
}
