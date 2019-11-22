package com.adobe.aem.guides.wknd.core.models.footer;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@Model(adaptables= Resource.class)
public class FooterList {

    @Inject
    @Optional
    private List<FooterItem> footer;


    @PostConstruct
    protected void init() {

    }

    public List<FooterItem> getFooter() {
        return footer;
    }
}

