package com.ywork.common;

import com.ywork.api.dto.in.KeyValue;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

public class Common {
    public static Object converterBigDecimal(Class<?> t, Object resFromDb) {
        if (t == Integer.class) {
            return ((BigDecimal) resFromDb).intValue();
        } else if (t == Long.class) {
            return ((BigDecimal) resFromDb).longValue();
        } else if (t == Float.class) {
            return ((BigDecimal) resFromDb).floatValue();
        } else if (t == Double.class) {
            return ((BigDecimal) resFromDb).doubleValue();
        } else if (t == Short.class) {
            return ((BigDecimal) resFromDb).shortValue();
        } else if (t == Byte.class) {
            return ((BigDecimal) resFromDb).byteValue();
        } else if (t == Boolean.class) {
            return ((BigDecimal) resFromDb).intValue() != 0;
        } else {
            return null;
        }
    }
    public static String subString(List<KeyValue> keyValues){
        return keyValues.stream().map(KeyValue::getValue).collect(Collectors.joining(","));
    }
}
