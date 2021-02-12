import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SelectBuilder from '../../coreView/common/select-input-builder';
import Switch from '../../coreView/common/switch';
import DateBuilder from '../../coreView/common/date-input-builder';
import moment from 'moment';

export default function RolePermissionsModifyView({itemState, appPrefs, onSave, onCancel, inputChange, applicationSelectList}) {
    
    let adminRolePermissionFormRights = {};
    
    let adminRolePermissionFormStartDate = {};
    let startDateDefault = "";
    
    let adminRolePermissionFormEndDate = {};
    let endDateDefault = "";
    
    let adminRolePermissionFormActive = {};
    let activeOptions = [];
    let item = itemState.selected;
    
    if (itemState.prefForms != null && itemState.prefForms.ADMIN_ROLE_PERMISSION_FORM != null) {
    	for (let i = 0; i < itemState.prefForms.ADMIN_ROLE_PERMISSION_FORM.length; i++) {
    		let formItems = itemState.prefForms.ADMIN_ROLE_PERMISSION_FORM;
    		switch (formItems[i].name) {
    		case "ADMIN_ROLE_PERMISSION_FORM_RIGHTS":
    			adminRolePermissionFormRights = formItems[i];
    			break;
    		case "ADMIN_ROLE_PERMISSION_FORM_STARTDATE":
    			adminRolePermissionFormStartDate = formItems[i];
    			if (adminRolePermissionFormStartDate.classModel != "") {
    				let startDateModel = JSON.parse(adminRolePermissionFormStartDate.classModel);
    				if (item != null && item[startDateModel.field] != null) {
    					startDateDefault = item[startDateModel.field];
    				}
    			}
    			break;
    		case "ADMIN_ROLE_PERMISSION_FORM_ENDDATE":
    			adminRolePermissionFormEndDate = formItems[i];
    			if (adminRolePermissionFormEndDate.classModel != "") {
    				let endDateModel = JSON.parse(adminRolePermissionFormEndDate.classModel);
    				if (item != null && item[endDateModel.field] != null) {
    					endDateDefault = item[endDateModel.field];
    				}
    			}
    			break;
    		case "ADMIN_ROLE_PERMISSION_FORM_ACTIVE":
    			adminRolePermissionFormActive = formItems[i];
    			if (adminRolePermissionFormActive.value != "") {
    				let valueObj = JSON.parse(adminRolePermissionFormActive.value);
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
			<h4 className="modal-title">Role to Permission</h4>
			{created}
			{modified}
			<div className="row">
				<div className="col-sm-4">
					<SelectBuilder itemState={itemState} field={adminRolePermissionFormRights} onChange={inputChange}/>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-4">
					<DateBuilder itemState={itemState} field={adminRolePermissionFormStartDate} onChange={inputChange}/>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-4">
					<DateBuilder itemState={itemState} field={adminRolePermissionFormEndDate} onChange={inputChange}/>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4">
					<Switch itemState={itemState} field={adminRolePermissionFormActive} onChange={inputChange} options={activeOptions}/>
				</div>
			</div>
			
			<button type="button" className="btn btn-primary" onClick={() => onSave()}>Save</button>
			<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => onCancel()}>Cancel</button>
    	</div>
    );
}


RolePermissionsModifyView.propTypes = {
	itemState: PropTypes.object.isRequired,
	appPrefs: PropTypes.object.isRequired,
	onSave: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	inputChange: PropTypes.func.isRequired
};
