sap.ui.define([], function () {
	"use strict";

	//Introduce namespace if it does not exist yet
	jQuery.sap.getObject("zpr.ui5.it.tm.core", 0);

	sap.ui.getCore().initLibrary({
		name: "zpr.ui5.it.tm.core.task",
		noLibraryCSS: true,
		version: "1.0.0",
		dependencies: [],
		types: [],
		controls: ["zpr.ui5.it.tm.core.task.C01"],
		elements: [],
		extensions: {}
	}, false);

	var me = window.zpr.ui5.it.tm.core.task;
	
	me.getLibraryResourceBundleText = function(sText,aParam) {
		if (!this._oRb) {
			this._oRb = sap.ui.getCore().getLibraryResourceBundle("zpr.ui5.it.tm.core.task");
		}
		return this._oRb.getText(sText,aParam);
	};

	/*****************************************************/
	return me;
});