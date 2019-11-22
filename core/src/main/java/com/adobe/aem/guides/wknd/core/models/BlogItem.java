package com.adobe.aem.guides.wknd.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;

import javax.inject.Inject;

@Model(adaptables= Resource.class)
public class BlogItem {

    @Inject
    @Optional
    private String img;
    @Inject
    @Optional
    private String subtitle;
    @Inject
    @Optional
    private String title;


    public String getImg() {
        return img;
    }

    public String getSubtitle() {
        return subtitle;
    }

    public String getTitle() {
        return title;
    }
}
