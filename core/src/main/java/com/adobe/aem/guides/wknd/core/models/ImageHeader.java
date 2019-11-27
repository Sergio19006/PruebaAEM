package com.adobe.aem.guides.wknd.core.models;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

@Model(adaptables = Resource.class)
public class ImageHeader {

    //private Resource image;
    @Inject
    @Optional
    //@Named(com.day.cq.commons.jcr.JcrConstants.JCR_TITLE)
    //private String title;
    private Image image;
    //private String file;

    @PostConstruct
    protected void init() {
        //file = image.getValueMap().get("fileReference", String.class);
    }

    public Image getImage() {
        return image;
    }
}
