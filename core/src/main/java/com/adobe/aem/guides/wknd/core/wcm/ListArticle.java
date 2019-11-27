package com.adobe.aem.guides.wknd.core.wcm;

import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.wcm.api.Page;
import org.apache.sling.api.resource.Resource;




import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ListArticle extends WCMUsePojo {
    private List<String> articleList;
    private Resource resource;

    @Override
    public void activate() {
        articleList = new ArrayList<String>();

        Page currentPage = getCurrentPage();
        Iterator<Page> iterator = currentPage.listChildren();
        while (iterator.hasNext())
            articleList.add(iterator.next().getTitle());
    }

    public List<String> getArticleList() {
        return articleList;
    }
}
