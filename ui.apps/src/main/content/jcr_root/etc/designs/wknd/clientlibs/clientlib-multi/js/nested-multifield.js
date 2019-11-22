(function () {
    var DATA_EAEM_NESTED = "data-aem-nested";
    var CFFW = ".coral-Form-fieldwrapper";

    function setSelect($field, value){
        var select = $field.closest(".coral-Select").data("select");

        if(select){
            select.setValue(value);
        }
    }

    function setCheckBox($field, value){
        $field.prop( "checked", $field.attr("value") == value);
    }

    //reads multifield data from server, creates the nested composite multifields and fills them
    function addDataInFields() {
        function getMultiFieldNames($multifields){

            var mNames = {}, mName;

            $multifields.each(function (i, multifield) {
                mName = $(multifield).children("[name$='@Delete']").attr("name");
                mName = mName.substring(0, mName.indexOf("@"));
                mName = mName.substring(2);
                mNames[mName] = $(multifield);
            });

            return mNames;
        }

        function buildMultiField(data, $multifield, mName){
            if(_.isEmpty(mName) || _.isEmpty(data)){
                return;
            }

            _.each(data, function(value, key){
                if(key == "jcr:primaryType"){
                    return;
                }

                $multifield.find(".js-coral-Multifield-add").click();

                _.each(value, function(fValue, fKey){
                    if(fKey == "jcr:primaryType"){
                        return;
                    }
                    
                    if(fKey == "category") {
                    	var $tagList = $multifield.find(".coral-TagList.js-TagsPickerField-tagList").last();
                    	if(fValue,length > 1) {
                    		for(var i = 0; i < fValue.length; i++) {
                    			var $listItem = $('<li class="coral-TagList-tag coral-TagList-tag--multiline"/>').attr('title', fValue[i])
                    			.append($('<button class="coral-MinimalButton coral-TagList-tag-removeButton" type="button"/>').attr('title', Granite.I18n.get("Remove"))
                    					.append($('<i class="coral-Icon coral-Icon--sizeXS coral-Icon--close"/>')))
                    					.append($('<span class="coral-TagList-tag-label">').text(fValue[i]))
                    					.append($('<input type="hidden" name="./' + fKey + '" value="' + fValue[i] + '">'));
                    			$tagList.append($listItem);
                    		}
                    		
                    	} else {
                    		var $listItem = $('<li class="coral-TagList-tag coral-TagList-tag--multiline"/>').attr('title', fValue)
                    		.append($('<button class="coral-MinimalButton coral-TagList-tag-removeButton" type="button"/>').attr('title', Granite.I18n.get("Remove"))
                    				.append($('<i class="coral-Icon coral-Icon--sizeXS coral-Icon--close"/>')))
                    				.append($('<span class="coral-TagList-tag-label">').text(fValue))
                    				.append($('<input type="hidden" name="./' + fKey + '" value="' + fValue + '">'));
                    		$tagList.append($listItem);
                    	}
                    	
                    }
                    
                    if(fKey.match(/url.*/)){
                        _.each(fValue, function(sValue, sKey) {

                            var $field = $multifield.find("[name='./" + fKey +"/"+ sKey + "']").last(),
                                type = $field.prop("type");

                            //handle single selection dropdown
                            if (type == "select-one") {
                                setSelect($field, sValue);
                            } else if (type == "checkbox") {
                                setCheckBox($field, sValue);
                            } if(type == "radio") {
                            	$field = $multifield.find("[name='./" + fKey +"/"+ sKey + "'][value='" + sValue + "']").last();
                                setCheckBox($field, sValue);
                                $field.attr("aria-selected","true");
                                $field.addClass("aria-selected","true");
                            }	else {
                                $field.val(sValue);
                            }
                        })

                    }else{
                        var $field = $multifield.find("[name='./" + fKey + "']").last(),
                            type = $field.prop("type");
                        
                        if(_.isEmpty($field)){
                            return;
                        }

                        //handle single selection dropdown
                        if( type == "select-one"){
                            setSelect($field, fValue);
                        }else if( type == "checkbox"){
                            setCheckBox($field, fValue);
                        }else{
                            $field.val(fValue);
                        }
                    }

                });
            });
        }

        $(document).on("dialog-ready", function() {
            var $multifields = $("[" + DATA_EAEM_NESTED + "]");

            if(_.isEmpty($multifields)){
                return;
            }

            var mNames = getMultiFieldNames($multifields),
                $form = $(".cq-dialog"),
                actionUrl = $form.attr("action") + ".infinity.json";

            $.ajax(actionUrl).done(postProcess);

            function postProcess(data){
                _.each(mNames, function($multifield, mName){
                    buildMultiField(data[mName], $multifield, mName);
                });
                $(".coral-Selector-option input[type='radio']").on("click", function() {
                	var value = $(this).val();
                	$(this).attr("aria-selected","true");
                	$(this).parent().parent().find(".coral-Selector-input").attr("aria-selected","false");
                	$(this).parent().parent().find(".coral-Selector-input").prop("checked",false);
                	$(this).parent().parent().find(".coral-Selector-input").removeClass("aria-selected");
                	
                	$(this).attr("aria-selected","true");
                	$(this).prop("checked",true);
                	$(this).addClass("aria-selected");
                	
                	return false;
                });
            }
        });
    }
    
    //collect data from widgets in multifield and POST them to CRX
    function collectDataFromFields(){
        function fillValue($form, fieldSetName, $field, counter){


            $field.each(function (i, subfield) {
                var name = $(subfield).attr("name");
                if (!name) {
                    return;
                }

                //strip ./
                if (name.indexOf("./") == 0) {
                    name = name.substring(2);
                }

                var value = $(subfield).val();

                if( $(subfield).prop("type") == "checkbox" ){
                    value = $(subfield).prop("checked") ? $(subfield).val() : "";
                }
                
                if( $(subfield).prop("type") == "radio"){
                	if($(subfield).attr("aria-selected") == 'true') {
                		value = $(subfield).val();
                		
                		$('<input />').attr('type', 'hidden')
                		.attr('name', fieldSetName + "/" + counter + "/" + name)
                		.attr('value', value )
                		.appendTo($form);
                	}
                } else {
                	$('<input />').attr('type', 'hidden')
                	.attr('name', fieldSetName + "/" + counter + "/" + name)
                	.attr('value', value )
                	.appendTo($form);
                }
                
                
            });

            //remove the field, so that individual values are not POSTed
            $field.remove();
        }

        $(document).on("click", ".cq-dialog-submit", function () {
            var $multifields = $("[" + DATA_EAEM_NESTED + "]");

            if(_.isEmpty($multifields)){
                return;
            }

            var $form = $(this).closest("form.foundation-form"),
                $fieldSets, $fields;

            $multifields.each(function(i, multifield){
                $fieldSets = $(multifield).find("[class='coral-Form-fieldset']");
                $fieldSets.each(function (counter, fieldSet) {
                    $fields = $(fieldSet).children().children(CFFW);
                    $fields.each(function (j, field) {
                        fillValue($form, $(fieldSet).data("name"), $(field).find("[name]"), (counter + 1));
                    });
                });
            });
        });
    }

    $(document).ready(function () {
        addDataInFields();
        collectDataFromFields();
    });

    //extend otb multifield for adjusting event propagation when there are nested multifields
    //for working around the nested multifield add and reorder
    CUI.Multifield = new Class({
        toString: "Multifield",
        extend: CUI.Multifield,

        construct: function (options) {
            this.script = this.$element.find(".js-coral-Multifield-input-template:last");
        },

         _addListeners: function () {
         this.superClass._addListeners.call(this);

         //otb coral event handler is added on selector .js-coral-Multifield-add
         //any nested multifield add click events are propagated to the parent multifield
         //to prevent adding a new composite field in both nested multifield and parent multifield
         //when user clicks on add of nested multifield, stop the event propagation to parent multifield
         this.$element.on("click", ".js-coral-Multifield-add", function (e) {
         e.stopPropagation();
         });

         this.$element.on("drop", function (e) {
         e.stopPropagation();
         });
         }
    });

    CUI.Widget.registry.register("multifield", CUI.Multifield);

})();