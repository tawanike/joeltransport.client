import React from 'react'
import { Form, FormGroup } from 'react-bootstrap';

type Props = {
    item: any;
}

function InventoryItem({ item }: Props) {
  return (
    <div className='InventoryItem'>
        <Form.Label>
            <Form.Control
                type='checkbox'
            />
            { item.title }
        </Form.Label>

    </div>
  )
}

export default InventoryItem;
