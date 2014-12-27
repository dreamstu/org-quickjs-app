package org.quickjs.app.controller;

import org.apache.log4j.Logger;
import org.quickjs.app.dtos.global.GParamsDTO;
import org.quickjs.app.dtos.user.UserDTO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by johnkim on 14-12-25.
 */
@Controller
public class UserController {
    private static final Logger logger = Logger
            .getLogger(IndexController.class);

    @RequestMapping(value = "login", method = RequestMethod.POST)
    public String login(HttpServletRequest request,ModelMap map,UserDTO user){
        String dispatch = "login";
        try{
            String name = user.getName();
            String pwd = user.getPassword();
            String msg = null;
            if("".equals(name)){
                msg = "请输入用户登录名！";
            }else if("".equals(pwd)){
                msg = "请输入登录密码！";
            }else{
                if("abc".equals(name) && "123".equals(pwd)){
                    dispatch = "index";
                }else{
                    msg = "用户名或密码错误！";
                }
            }
            user.setPassword("");
            map.put("result", GParamsDTO.setParams(1, msg ,new Object[]{user}));
        }catch (Exception e){
            logger.error(e.getMessage());
        }
        return dispatch;
    }
}
