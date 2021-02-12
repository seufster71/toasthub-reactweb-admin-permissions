import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from '../../coreView/common/table';
import ListBuilder from '../../coreView/common/list-builder';
import Modal from '../../coreView/common/modal';

export default function PermissionsView({itemState, appPrefs, onListLimitChange, onSearchChange, onSearchClick, onPaginationClick, 
	onOrderBy, onOption, closeModal, inputChange, goBack, session }) {

	let columns = [];
	if (itemState.prefLabels != null && itemState.prefLabels.ADMIN_PERMISSION_PAGE != null) {
		columns = itemState.prefLabels.ADMIN_PERMISSION_PAGE;
	}
	let group = "TABLE1";

	let header = "";
	let parent = null;
	if (itemState.parent != null) {
		parent = itemState.parent.title.langTexts[0].text;
	}
	if (itemState.prefTexts.ADMIN_PERMISSION_PAGE != null && itemState.prefTexts.ADMIN_PERMISSION_PAGE.ADMIN_PERMISSION_PAGE_HEADER != null) {
		header = itemState.prefTexts.ADMIN_PERMISSION_PAGE.ADMIN_PERMISSION_PAGE_HEADER.value;
	}
	
	if (goBack != null && parent != null && parent != "") {
		header = <span>{header} : <a onClick={() => goBack()} aria-hidden="true">{parent}</a></span>;
	}
	
	let deleteModalHeader = "Delete ";
	if (itemState.selected != null && itemState.selected.title != null) {
		deleteModalHeader += itemState.selected.title.defaultText;
	}
	
	let viewPortSmall = false;
	if (session.viewPort === 'small') { viewPortSmall = true }
	
	return (
		<div>
		  	{viewPortSmall ? (
		  		<ListBuilder
		  	      	itemState={itemState}
		  	      	header={header}
		  	     	columns={columns}
		  	      	appPrefs={appPrefs}
		  	      	onListLimitChange={onListLimitChange}
		  	      	onSearchChange={onSearchChange}
		  	      	onSearchClick={onSearchClick}
		  	      	onPaginationClick={onPaginationClick}
		  			onOrderBy={onOrderBy}
	  				onOption={onOption}
	  				goBack={goBack}
		  	      />
		  	) : (
		  		<Table
		  			itemState={itemState}
		  			header={header}
		  			columns={columns}
		  		    labelGroup={group}
		  			appPrefs={appPrefs}
		  			parent={parent}
		  			onListLimitChange={onListLimitChange}
		  			onSearchChange={onSearchChange}
		  			onSearchClick={onSearchClick}
		  			onPaginationClick={onPaginationClick}
		  			onOrderBy={onOrderBy}
		  			onOption={onOption}
		  			goBack={goBack}
		  		/>
	  		)}
	  		<Modal isOpen={itemState.isDeleteModalOpen} onClose={() => closeModal()} >
	  			<div className="modal-dialog">
	  				<div className="modal-content">
	  					<div className="modal-header">
	  						<button type="button" className="close" data-dismiss="modal" aria-hidden="true"><i className="fa fa-close"/></button>
	  						<h4 className="modal-title">{deleteModalHeader}</h4>
	  					</div>
	  					<div className="modal-body">
	  						<h3>Are you sure you want to delete?</h3>
	  					</div>
	  					<div className="modal-footer">
	  						<button type="button" className="btn btn-primary" onClick={() => onOption("DELETEFINAL",itemState.selected)}>Delete</button>
	  						<button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => closeModal()}>Close</button>
	  					</div>
	  				</div>
	  			</div>
	  		</Modal>
	  	</div>
	);
}


PermissionsView.propTypes = {
	itemState: PropTypes.object.isRequired,
	appPrefs: PropTypes.object,
	onListLimitChange: PropTypes.func,
	onSearchChange: PropTypes.func,
	onSearchClick: PropTypes.func,
	onPaginationClick: PropTypes.func,
	onOrderBy: PropTypes.func,
	openDeleteModal: PropTypes.func,
	closeModal: PropTypes.func,
	onOption: PropTypes.func,
	inputChange: PropTypes.func,
	goBack: PropTypes.func,
	session: PropTypes.object
};
