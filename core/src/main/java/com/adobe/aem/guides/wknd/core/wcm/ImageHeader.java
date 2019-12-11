package com.adobe.aem.guides.wknd.core.wcm;

import com.adobe.aem.guides.wknd.core.models.Image;
import com.adobe.cq.sightly.WCMUsePojo;
import org.apache.sling.api.resource.Resource;

public class ImageHeader extends WCMUsePojo {

    private Image image;

    @Override
    public void activate() {
        Resource img = getResource().getChild("image");;
        image = img.adaptTo(Image.class);
    }

    public Image getImage() {
        return image;
    }
}
