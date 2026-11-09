sap.ui.define([
	"com/xft/tm/task/a01/handler/ActivityHandler",
	"./library",
	"sap/m/MessageBox"
], function (P, Lib, MessageBox) {
	"use strict";
	var me = P.extend("zpr.ui5.it.tm.core.task.ActivityHandler", {
		execute: function (oEvent) {
			var oActivity = oEvent.getParameter("activity");
			switch (oActivity.getFunctionCode()) {
			case "ZZZ": //TODO replace: FCode and behaviour
				MessageBox.information("Activity executed");
				break;
			default:
				P.prototype.execute.apply(this, arguments);
			}
		},
		beforeExecute: function (pBeforeExecute) {
			switch (pBeforeExecute.getActivity().getFunctionCode()) {
			case "ZZZ": //TODO replace: FCode and behaviour
				var promise = pBeforeExecute;
				MessageBox.show(Lib.getLibraryResourceBundleText("question"), {
					icon: MessageBox.Icon.INFORMATION,
					title: Lib.getLibraryResourceBundleText("title"),
					actions: [MessageBox.Action.YES, MessageBox.Action.NO],
					emphasizedAction: MessageBox.Action.NO,
					onClose: function (oAction) {
						if (oAction === MessageBox.Action.YES) {
							promise.resolve("Continue");
						} else {
							promise.reject("Cancel");
						}
					}
				});
				break;
			default:
				P.prototype.beforeExecute.apply(this, arguments);
			}
		}
	});
	return me;
});