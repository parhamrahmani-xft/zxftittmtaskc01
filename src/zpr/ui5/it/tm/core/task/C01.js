sap.ui.define([
    "com/xft/tm/core/task/control/SubControl",
    "com/xft/ui/model/odata/library",
    "sap/ui/layout/form/SimpleForm",
    "sap/m/Label",
    "sap/m/Input"
], function (P, XO, SimpleForm, Label, Input) {
    "use strict";

    return P.extend("zpr.ui5.it.tm.core.task.C01", {
        renderer: "com.xft.tm.core.task.control.SubControlRenderer",

        init: function () {
            if (typeof P.prototype.init === "function") {
                P.prototype.init.apply(this, arguments);
            }
            this._model = XO.createODataModel({
                url: "/sap/opu/odata/sap/ZPR_UI5_IT_SRV/",
                config: {
                    "sap-system": this.getSapSystem(),
                    json: true,
                    defaultBindingMode: "TwoWay",
                    useBatch: true,
                    defaultCountMode: "None",
                    defaultUpdateMethod: "PUT",
                    loadMetadataAsync: false,
                    tokenHandling: true,
                    refreshAfterChange: true
                }
            });
            this._model.attachRequestFailed(this._displayError, this);
            this.setModel(this._model);

            this._form = new SimpleForm({
                editable: true,
                layout: "ResponsiveGridLayout",
                content: [
                    new Label({ text: "Business Partner" }),
                    new Input({ value: "{BuPartner}", editable: "{IsChangeable}", maxLength: 10 })
                ]
            });
            this.setAggregation("_content", this._form);
        },

        sessionChanged: function () {
            if (!this.getSessionId() || !this.getCompId()) {
                return;
            }
            var that = this;
            this._form.bindElement({
                path: this._getODataPath("C01HeadSet", "", true),
                events: {
                    dataRequested: function () { that.setBusy(true); },
                    dataReceived: function () { that.setBusy(false); }
                }
            });
        },

        getCompType: function () {
            return "ZPR_UI5_IT_TYPE_C01";
        },

        nestedActionRead: function (oTrigger, oData, callback) {
            var oBinding = this._form.getElementBinding();
            if (oBinding) {
                oBinding.refresh(true);
            } else {
                this.sessionChanged();
            }
            callback({ allowed: true, messages: [] });
        },

        nestedActionUpdate: function (oTrigger, oData, callback) {
            if (!this._model.hasPendingChanges()) {
                callback({ allowed: true, messages: [] });
                return;
            }
            this._model.submitChanges({
                success: function () { callback({ allowed: true, messages: [] }); },
                error: function () { callback({ allowed: false, messages: ["Saving section C01 failed"] }); }
            });
        }
    });
});