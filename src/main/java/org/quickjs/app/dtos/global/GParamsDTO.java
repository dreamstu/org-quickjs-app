package org.quickjs.app.dtos.global;

import lombok.Data;

/**
 * Created by johnkim on 14-12-25.
 * 公共参数传递DTO
 */
@Data
public class GParamsDTO {
    /***
     * 处理消息
     */
    private String msg;

    /***
     * 处理状态
     */
    private int state;

    /***
     * 其他需要传递的DTO
     */
    private Object[] dtos;


    public static GParamsDTO setParams(int state,String msg,Object[] dtos){
        GParamsDTO dto = new GParamsDTO();
        dto.setState(state);
        dto.setMsg(msg);
        dto.setDtos(dtos);
        return dto;
    }

    public static GParamsDTO setParams(int state,String msg){
        GParamsDTO dto = new GParamsDTO();
        dto.setState(state);
        dto.setMsg(msg);
        return  dto;
    }

    public static GParamsDTO setParams(int state){
        GParamsDTO dto = new GParamsDTO();
        dto.setState(state);
        return  dto;
    }
}
