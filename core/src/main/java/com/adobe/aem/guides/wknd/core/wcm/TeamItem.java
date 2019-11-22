package com.adobe.aem.guides.wknd.core.wcm;

import com.adobe.cq.sightly.WCMUsePojo;

public class TeamItem extends WCMUsePojo {

    private String name;
    private String position;
    private String img;

    @Override
    public void activate() {
        name = getResource().getValueMap().get("name", String.class);
        position = getResource().getValueMap().get("position", String.class);
        img = getResource().getValueMap().get("img", String.class);
    }

    public String getName() {
        return name;
    }

    public String getPosition() {
        return position;
    }

    public String getImg() {
        return img;
    }
}
