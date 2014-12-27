package org.quickjs.app.controller;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class BaseController {

	private static final Logger logger = Logger.getLogger(BaseController.class);

	@RequestMapping(value = "{target}", method = RequestMethod.GET)
	public String toPage(ModelMap map, HttpServletRequest request,
			@PathVariable("target") String target) {
		logger.info("toPage " + target + " start!");
		return target;
	}
}
