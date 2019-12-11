package com.adobe.aem.guides.wknd.core.types;

public class Nav {
    private String path;
    private String name;

    public Nav(String name, String path){
        this.path = path;
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
