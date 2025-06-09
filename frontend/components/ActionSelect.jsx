import React from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

export const ActionSelect = ({deleteAction, targetId, editAction}) => {
  	return (
    	<>
	<DropdownButton id="dropdown-basic-button" title="Actions" size="sm" variant="secondary">
      <Dropdown.Item as="button" onClick={() => editAction(targetId)} >Edit</Dropdown.Item>
	<Dropdown.Divider/>
      <Dropdown.Item as="button" onClick={() => deleteAction(targetId)}>Delete</Dropdown.Item>
    	</DropdownButton>
    	</>
  	)
}