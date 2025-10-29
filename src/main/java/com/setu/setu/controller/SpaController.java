package com.setu.setu.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaController {

    @RequestMapping(value = "/{path:[^\\.]*}")
    public String forwardToIndex() {
        return "forward:/index.html";
    }
}