import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextBuilder from '../../coreView/common/text-input-builder';
import MultiLangTextInput from '../../coreView/common/multi-lang-text-input';
import SelectBuilder from '../../coreView/common/select-input-builder';
import Switch from '../../coreView/common/switch';
import moment from 'moment';

export default function PermissionsModifyView({itemState, appPrefs, onSave, onCancel, inputChange, applicationSelectList}) {
    
    let adminPermissionFormTitle = {};

    let adminPermissionFormCode = {};

    let adminPermissionFormApplication = {};
    
    let adminPermissionFormRights = {};
    
    let adminPermissionFormStartDate = {};
    let startDateDefault = "";
    
    let adminPermissionFormEndDate = {};
    let endDateDefault = "";
    
    let adminPermissionFormActive = {};
    let activeOptions = [];
	let item = itemState.selected;
    
    if (itemState.prefForms != null && itemState.prefForms.ADMIN_PERMISSION_FORM != null) {
    	for (let i = 0; i < itemState.prefForms.ADMIN_PERMISSION_FORM.length; i++) {
    		let formItems = itemState.prefForms.ADMIN_PERMISSION_FORM;
    		switch (formItems[i].name) {
    		case "ADMIN_PERMISSION_FORM_TITLE":
    			adminPermissionFormTitle = formItems[i];
    			break;
    		case "ADMIN_PERMISSION_FORM_CODE":
    			adminPermissionFormCode = formItems[i];
    			break;
    		case "ADMIN_PERMISSION_FORM_APPLICATION":
    			adminPermissionFormApplication = formItems[i];
    			break;
    		case "ADMIN_PERMISSION_FORM_RIGHTS":
    			adminPermissionFormRights = formItems[i];
    			break;
    		case "ADMIN_PERMISSION_FORM_STARTDATE":
    			adminPermissionFormStartDate = formItems[i];
    			if (adminPermissionFormStartDate.classModel != "") {
    				let startDateModel = JSON.parse(adminPermissionFormStartDate.classModel);
    				if (item != null && item[startDateModel.field] != null) {
    					startDateDefault = item[startDateModel.field];
    				}
    			}
    			break;
    		case "ADMIN_PERMISSION_FORM_ENDDATE":
    			adminPermissionFormEndDate = formItems[i];
    			if (adminPermissionFormEndDate.classModel != "") {
    				let endDateModel = JSON.parse(adminPermissionFormEndDate.classModel);
    				if (item != null && item[endDateModel.field] != null) {
    					endDateDefault = item[endDateModel.field];
    				}
    			}
    			break;
    		case "ADMIN_PERMISSION_FORM_ACTIVE":
    			adminPermissionFormActive = formItems[i];
    			
    			if (adminPermissionFormActive.value != "") {
    				let valueObj = JSON.parse(adminPermissionFormActive.value);
    				if (valueObj.options != null) {
    					activeOptions = valueObj.options;
    				} else if (valueObj.referPref != null) {
    					let pref = appPrefs.prefTexts[valueObj.referPref.prefName][valueObj.referPref.prefItem];
    					if (pref != null && pref.value != null && pref.value != "") {
    						let value = JSON.parse(pref.value);
    						if (value.options != null) {
    							activeOptions = value.options;
    						}
    					}
    				}
    			}
    			break;
    		}
    	}
    }
    
    let created = "";
    if (item != null && item.created != null) {
    	created = new Intl.DateTimeFormat('en-US',{
    		year: 'numeric', month: 'numeric', day: 'numeric',
    		hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'America/New_York'
    	}).format(moment(item.created).toDate());
    	created = <div>Created: {created}</div>;
    }
    
    let modified = "";
    if (item != null && item.modified != null) {
    	modified = new Intl.DateTimeFormat('en-US',{
    		year: 'numeric', month: 'numeric', day: 'numeric',
    		hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'America/New_York'
    	}).format(moment(item.modified).toDate());
    	modified = <div>Last Modified: {modified}</div>
    }
    
    return (
    	<div className="col-lg-12">
			<h4 className="modal-title">Permission</h4>
			{created}
			{modified}
			<div className="row">
				<div className="col-sm-4">
					<MultiLangTextInput itemState={itemState} field={adminPermissionFormTitle} inputChange={inputChange} appPrefs={appPrefs}/>		
				</div>
			</div>
			<div className="row">
				<div className="col-sm-4">
					<TextBuilder itemState={itemState} field={adminPermissionFormCode} inputChange={inputChange}/>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-4">
					<SelectBuilder itemState={itemState} field={adminPermissionFormApplication} inputChange={inputChange} options={applicationSelectList}/>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-4">
					<SelectBuilder itemState={itemState} field={adminPermissionFormRights} inputChange={inputChange}/>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4">
					<Switch itemState={itemState} field={adminPermissionFormActive} inputChange={inputChange} options={activeOptions}/>
				</div>
			</div>
			
			<button type="button" className="btn btn-primary" onClick={() => onSave()}>Save</button>
			<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => onCancel()}>Cancel</button>
    	</div>
    );
}


PermissionsModifyView.propTypes = {
  	itemState: PropTypes.object.isRequired,
  	appPrefs: PropTypes.object.isRequired,
  	onSave: PropTypes.func.isRequired,
  	onCancel: PropTypes.func.isRequired,
  	inputChange: PropTypes.func.isRequired
};
