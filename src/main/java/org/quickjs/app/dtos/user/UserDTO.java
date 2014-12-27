package org.quickjs.app.dtos.user;

import lombok.Data;

/**
 * Created by johnkim on 14-12-25.
 */
@Data
public class UserDTO {
    /**
     *  用户名
     */
    private String name;

    /***
     * 密码
     */
    private String password;

    /***
     * 是否记住密码（0：不记住 1：记住）
     */
    private int remeber;

}
