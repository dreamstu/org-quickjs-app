package org.quickjs.app.controller;

import org.apache.log4j.Logger;
import org.quickjs.app.dtos.global.GParamsDTO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping(value = "index")
public class IndexController {

	private static final Logger logger = Logger
			.getLogger(IndexController.class);

	@RequestMapping(value = "{target}", method = RequestMethod.GET)
	public String help(HttpServletRequest request,
			@PathVariable("target") String target, ModelMap map) {
		try {
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		return "index/" + target;
	}

}
