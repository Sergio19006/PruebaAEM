package com.adobe.aem.guides.wknd.core.models;

import com.adobe.aem.guides.wknd.core.types.Nav;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Optional;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Model(adaptables = Resource.class)
public class BreadCumb {

    @Inject @Optional
    private Page currentPage;
    @Inject
    ResourceResolver resourceResolver;
    @Self
    private Resource resource;
    private List<Nav> paths;

    @PostConstruct
    public void init(){
        paths = new ArrayList<Nav>();
        PageManager pageManager = resourceResolver.adaptTo(PageManager.class);
        Page currentPage = pageManager.getContainingPage(resource);

        while((currentPage.getDepth() > 2)){
            paths.add(0, new Nav(currentPage.getTitle(),currentPage.getPath()));
            currentPage = currentPage.getParent();
        }
    }

    public List<Nav> getPath() {
        return paths;
    }
}
