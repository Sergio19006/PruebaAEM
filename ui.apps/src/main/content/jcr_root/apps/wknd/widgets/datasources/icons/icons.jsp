<%@page session="false" import="
                                com.adobe.granite.ui.components.ds.DataSource,
                                com.adobe.granite.ui.components.ds.EmptyDataSource,
                                com.adobe.granite.ui.components.ds.SimpleDataSource,
                                com.adobe.granite.ui.components.ds.ValueMapResource,
                                org.apache.sling.api.resource.Resource,
                                org.apache.sling.api.resource.ResourceMetadata,
                                org.apache.sling.api.resource.ResourceResolver,
                                org.apache.sling.api.resource.ValueMap,
                                org.apache.sling.api.wrappers.ValueMapDecorator,
                                java.util.ArrayList,
                                java.util.HashMap,
                                java.util.List" %>

<%@taglib prefix="cq" uri="http://www.day.com/taglibs/cq/1.0" %>
<cq:defineObjects/><%

  // set fallback
  request.setAttribute(DataSource.class.getName(), EmptyDataSource.instance());

  ResourceResolver resolver = resource.getResourceResolver();

//Create an ArrayList to hold data
  List<Resource> resourceList = new ArrayList<>();

  ValueMap vm = null;

  String[] targetValues = {"", "lnr-rocket", "lnr-magic-wand", "lnr-bug"};
  String[] targetText = {"none","rocket", "wand", "bug"};

  for (int i = 0; i < targetValues.length; i++) {

    //allocate memory to the Map instance
    vm = new ValueMapDecorator(new HashMap<>());


    // Specify the value and text values
    String Value = targetValues[i];
    String Text = targetText[i];

    //populate the map
    vm.put("value", Value);
    vm.put("text", Text);

    resourceList.add(new ValueMapResource(resolver, new ResourceMetadata(), "nt:unstructured", vm));
  }


//Create a DataSource that is used to populate the drop-down control
  DataSource ds = new SimpleDataSource(resourceList.iterator());
  request.setAttribute(DataSource.class.getName(), ds);

%>