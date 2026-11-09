/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library zpr.ui5.it.tm.core.
 */
sap.ui.define(["sap/ui/core/library"], // library dependency
	function () {

		"use strict";

		/**
		 * 
		 *
		 * @namespace
		 * @name zpr.ui5.it.tm.core
		 * @author SAP SE
		 * @version 1.0.0
		 * @public
		 */

		// delegate further initialization of this library to the Core
		sap.ui.getCore().initLibrary({
			name: "zpr.ui5.it.tm.core",
			version: "1.0.0",
			noLibraryCSS: true, dependencies: ["sap.ui.core","com.xft.m","com.xft.ui","com.xft.tm.core"],
			types: [],
			interfaces: [],
			controls: [],
			elements: []
		});

		/* eslint-disable */
		return zpr.ui5.it.tm.core;
		/* eslint-enable */

	}, /* bExport= */ false);