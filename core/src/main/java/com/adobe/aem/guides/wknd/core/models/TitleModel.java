package com.adobe.aem.guides.wknd.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

@Model(adaptables= Resource.class)
public class TitleModel {

    @Inject @Optional
    private String name;

    @PostConstruct
    protected void init() {
        name = "\tHello World! " + name;
    }

    public String getName() {
        return name;
    }
}
