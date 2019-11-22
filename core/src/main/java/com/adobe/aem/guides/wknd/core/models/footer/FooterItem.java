package com.adobe.aem.guides.wknd.core.models.footer;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

@Model(adaptables= Resource.class)
public class FooterItem {

    @Inject
    @Optional
    private String link;
    @Inject
    @Optional
    private String text;


    @PostConstruct
    protected void init() {

    }

    public String getLink() {
        return link;
    }

    public String getText() {
        return text;
    }
}
