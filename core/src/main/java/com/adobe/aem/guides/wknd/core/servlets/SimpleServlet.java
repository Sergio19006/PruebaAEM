/*
 *  Copyright 2015 Adobe Systems Incorporated
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.adobe.aem.guides.wknd.core.servlets;

import com.day.cq.search.PredicateGroup;
import com.day.cq.search.Query;
import com.day.cq.search.QueryBuilder;
import com.day.cq.search.result.Hit;
import com.day.cq.search.result.SearchResult;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.commons.json.JSONException;
import org.apache.sling.commons.json.JSONObject;
import org.osgi.framework.Constants;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;

import javax.jcr.Session;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Servlet that writes some sample content into the response. It is mounted for
 * all resources of a specific Sling resource type. The
 * {@link SlingSafeMethodsServlet} shall be used for HTTP methods that are
 * idempotent. For write operations use the {@link SlingAllMethodsServlet}.
 */
@Component(service= Servlet.class, immediate = true,
        property={
                Constants.SERVICE_DESCRIPTION + "=ENEL Common - Migration Resource Types",
                "sling.servlet.methods=" + HttpConstants.METHOD_GET,
                "sling.servlet.paths="+ "/bin/migrationResourceTypes",
                "sling.servlet.extensions=" + "html"
        })
public class SimpleServlet extends SlingSafeMethodsServlet {

    private static final long serialVersionUid = 1L;
    @Reference
    private QueryBuilder queryBuilder;

    @Override
    protected void doGet(final SlingHttpServletRequest request,
                           final SlingHttpServletResponse response) throws ServletException, IOException {

        int n = 0;
        JSONObject json = new JSONObject();

        if(queryBuilder != null) {
            ResourceResolver resourceResolver = request.getResourceResolver();
            Query query = createQuery(resourceResolver.adaptTo(Session.class));
            SearchResult result = query.getResult();

            // iterating over the results
            response.setContentType("application/json");

            for (Hit hit : result.getHits()) {
                try {
                    Resource resource = hit.getResource();
                    response.setStatus(200);
                    //json.accumulate("name",resource.getName());
                    //json.accumulate("path",resource.getPath());
                    n++;
                } catch (Exception e) {
                    System.out.println(1);
                }
            }
        }
        try {
            json.put("title", "title");
            json.put("message", "message");
            response.getWriter().write(json.toString());
        } catch (JSONException e) {
            String fallbackJSON = "{ \"title\": \"Error creating error response. "
                    + "Please review AEM error logs.\" }";
            response.getWriter().write(fallbackJSON);
        }
    }

    public Query createQuery(Session session) {
// create query description as hash map (simplest way, same as form post)
        Map<String, String> map = new HashMap<>();

// create query description as hash map (simplest way, same as form post)
        map.put("path", "/content/dam");
        map.put("property", "jcr:primaryType");
        map.put("property.operation", "like");
        map.put("property.value", "dam%");

        return queryBuilder.createQuery(PredicateGroup.create(map), session);
    }
}
