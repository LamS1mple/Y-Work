package com.ywork.common;

import java.math.BigDecimal;

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
}
