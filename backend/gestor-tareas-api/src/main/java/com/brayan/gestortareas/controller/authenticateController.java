package com.brayan.gestortareas.controller;

import com.brayan.gestortareas.model.*;
import com.brayan.gestortareas.security.authenticate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")

public class authenticateController {

    @Autowired
    private authenticate authenticateService;

    @PostMapping("/login")
    public String login(@RequestBody log log) throws Exception {
        return authenticateService.login(log);
    }

    @PostMapping("/register")
    public Usuario register(@RequestBody Register register) throws Exception {
        return authenticateService.register(register);
    }

}