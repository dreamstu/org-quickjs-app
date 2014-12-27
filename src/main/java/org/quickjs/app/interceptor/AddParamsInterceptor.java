package org.quickjs.app.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.quickjs.app.controller.BaseController;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

/****
 * 未登录用户拦截器 |登录用户请求自动添加基础数据
 *
 * @author dreamstu
 *
 */
public class AddParamsInterceptor implements HandlerInterceptor {

	private static final Logger logger = Logger.getLogger(BaseController.class);

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		// TODO Auto-generated method stub
		System.out.println("pre handle...");
		HttpSession session = request.getSession();
		Object user = session.getAttribute("user");
		if (user == null) {
			String appName = request.getContextPath();
			String currUrl = request.getRequestURI();
			request.setAttribute("next", appName + currUrl);
			request.getRequestDispatcher("/login.html").forward(request,
					response);
			return false;
		} else {
			return true;
		}
	}

	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub
		logger.info("buildBaseParams interceptor start!");
		String appName = request.getContextPath();
		String currUrl = request.getRequestURI();
		// logger.info("页面标题：" + title);
		logger.info("appName：" + appName);
		logger.info("currUrl：" + currUrl);
		logger.info("buildBaseParams end!");
		// modelAndView.addObject("title", title);
		modelAndView.addObject("appName", appName);
		modelAndView.addObject("currUrl", currUrl);
	}

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub
		System.out.println("after handle...");

	}

}
