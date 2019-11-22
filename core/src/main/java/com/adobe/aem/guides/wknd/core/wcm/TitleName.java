package com.adobe.aem.guides.wknd.core.wcm;

import com.adobe.cq.sightly.WCMUsePojo;
import com.day.cq.wcm.api.Page;
import org.apache.sling.api.resource.ValueMap;

public class TitleName extends WCMUsePojo {
    private String name;


    @Override
    public void activate() {
        String aux = getResource().getValueMap().get("name", String.class);
        name = "funciona " + aux;
    }

    public String getName() {
        return name;
    }
}
