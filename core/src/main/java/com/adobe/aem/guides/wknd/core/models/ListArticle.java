package com.adobe.aem.guides.wknd.core.models;

import com.adobe.aem.guides.wknd.core.types.Article;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.Self;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Model(adaptables = Resource.class)
public class ListArticle {

    private List<Article> articleList;

    @Inject
    ResourceResolver resourceResolver;

    @Self
    private Resource resource;

    @PostConstruct
    public void init() {

        articleList = new ArrayList<Article>();

        PageManager pageManager = resourceResolver.adaptTo(PageManager.class);

        Page currentPage = pageManager.getContainingPage(resource);
        Iterator<Page> iterator = currentPage.listChildren();
        try {
            while (iterator.hasNext()) {
                Page page = iterator.next();
                articleList.add(new Article(page.getTitle(),page.getPath()));
            }
        }catch (Exception e){
            System.out.println(e);
        }
    }

    public List<Article> getArticleList() {
        return articleList;
    }
}
