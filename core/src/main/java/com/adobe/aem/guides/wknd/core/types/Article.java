package com.adobe.aem.guides.wknd.core.types;

public class Article {

    private String path;
    private String title;

    public Article(String title, String path){
        this.path = path;
        this.title = title;

    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
